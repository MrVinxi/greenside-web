import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { ucp, discordId, password } = await req.json();

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Cek Duplikasi UCP atau DiscordID (Sesuai kolom di DB Anda)
    const [rows]: any = await db.execute(
      "SELECT ucp, DiscordID FROM playerucp WHERE ucp = ? OR DiscordID = ?",
      [ucp, discordId]
    );

    if (rows.length > 0) {
      await db.end();
      return NextResponse.json(
        { error: rows[0].ucp === ucp ? "Nama UCP sudah ada!" : "Discord ID sudah terpakai!" },
        { status: 400 }
      );
    }

    // Hash SHA256 + Salt (Standar SAMP)
    const salt = crypto.randomBytes(8).toString("hex").toUpperCase();
    const hash = crypto.createHash("sha256").update(password + salt).digest("hex").toUpperCase();

    // Insert data (verifycode default 0, extrac default 1)
    await db.execute(
      "INSERT INTO playerucp (ucp, password, salt, DiscordID, verifycode, extrac, registered) VALUES (?, ?, ?, ?, 0, 1, 1)",
      [ucp, hash, salt, discordId]
    );
    await db.end();

    // Kirim DM via Discord API
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
            title: "🌿 GREENSIDE ROLEPLAY - REGISTRASI",
            description: `Akun **${ucp}** berhasil dibuat!`,
            color: 3066993,
            fields: [
              { name: "User UCP", value: `\`${ucp}\``, inline: true },
              { name: "Status", value: "`Verified`", inline: true }
            ],
            footer: { text: "Simpan password Anda dengan aman." }
          }]
        }),
      });
    }

    return NextResponse.json({ message: "Registrasi Berhasil! Cek DM Discord." });
  } catch (err: any) {
    return NextResponse.json({ error: "Server Error: " + err.message }, { status: 500 });
  }
}