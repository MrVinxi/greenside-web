import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { username, discordId } = await req.json();

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // 1. Cek apakah username atau DiscordID sudah ada
    const [rows]: any = await db.execute(
      "SELECT username, DiscordID FROM ucp WHERE username = ? OR DiscordID = ?",
      [username, discordId]
    );

    if (rows.length > 0) {
      await db.end();
      return NextResponse.json(
        { error: rows[0].username === username ? "Nama UCP sudah terdaftar!" : "Discord ID sudah digunakan!" },
        { status: 400 }
      );
    }

    // 2. Generate PIN Random 6 Digit
    const randomPin = Math.floor(100000 + Math.random() * 900000);

    // 3. Simpan ke Database dengan menyertakan kolom salt dan password
    // Kita isi salt dan password dengan string kosong "" untuk menghindari error "no default value"
    await db.execute(
      "INSERT INTO ucp (username, pin, DiscordID, salt, password) VALUES (?, ?, ?, ?, ?)",
      [username, randomPin, discordId, "", ""]
    );
    await db.end();

    // 4. Kirim DM Discord
    const botToken = process.env.DISCORD_TOKEN;
    const channelRes = await fetch("https://discord.com/api/v10/users/@me/channels", {
      method: "POST",
      headers: { "Authorization": `Bot ${botToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ recipient_id: discordId }),
    });
    const channel = await channelRes.json();

    if (channel.id) {
      await fetch(`https://discord.com/api/v10/channels/${channel.id}/messages`, {
        method: "POST",
        headers: { "Authorization": `Bot ${botToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "🌿 AKUN UCP BERHASIL DIBUAT",
            description: "Gunakan informasi di bawah ini untuk login ke dalam server.",
            color: 3066993,
            fields: [
              { name: "👤 Nama UCP", value: `\`${username}\``, inline: true },
              { name: "🔢 PIN LOGIN", value: `**${randomPin}**`, inline: true },
              { name: "⚠️ PENTING", value: "PIN ini digunakan sebagai 'verifycode' saat Anda pertama kali masuk ke server.", inline: false }
            ],
            footer: { text: "Greenside Roleplay - Security System" },
            timestamp: new Date()
          }]
        }),
      });
    }

    return NextResponse.json({ message: "Registrasi Berhasil! PIN telah dikirim ke DM Discord Anda." });
  } catch (err: any) {
    return NextResponse.json({ error: "Gagal memproses data: " + err.message }, { status: 500 });
  }
}