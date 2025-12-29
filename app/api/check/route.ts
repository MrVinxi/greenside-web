import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { discordId } = await req.json();

    // 1. Validasi Input
    if (!discordId) {
      return NextResponse.json({ error: "ID Discord tidak boleh kosong!" }, { status: 400 });
    }

    // 2. Koneksi ke Database (Gunakan Environment Variables)
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // 3. Cari data berdasarkan DiscordID
    // Pastikan nama kolom sesuai: 'ucp' dan 'verifycode' (dan 'DiscordID' dengan D besar)
    const [rows]: any = await db.execute(
      "SELECT username, pin FROM ucp WHERE DiscordID = ?",
      [discordId]
    );
    await db.end();

    // 4. Jika data tidak ditemukan
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "ID Discord ini belum terdaftar di database kami!" },
        { status: 404 }
      );
    }

    const { username, pin } = rows[0];

    // 5. Kirim DM Discord melalui API Discord
    const botToken = process.env.DISCORD_TOKEN;

    // A. Buka Channel DM
    const channelRes = await fetch("https://discord.com/api/v10/users/@me/channels", {
      method: "POST",
      headers: { 
        "Authorization": `Bot ${botToken}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ recipient_id: discordId }),
    });

    const channelData = await channelRes.json();

    if (!channelRes.ok) {
      console.error("Discord Channel Error:", channelData);
      return NextResponse.json(
        { error: "Bot tidak bisa mengirim DM. Pastikan Anda dan Bot berada di server yang sama!" },
        { status: 400 }
      );
    }

    // B. Kirim Pesan Embed ke Channel DM tersebut
    const messageRes = await fetch(`https://discord.com/api/v10/channels/${channelData.id}/messages`, {
      method: "POST",
      headers: { 
        "Authorization": `Bot ${botToken}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        embeds: [{
          title: "🔍 PEMULIHAN AKUN UCP",
          description: "Seseorang (mungkin Anda) baru saja meminta informasi akun melalui website.",
          color: 3447003, // Warna Biru (Hex: #3498db)
          fields: [
            { name: "👤 Nama UCP", value: `\`${username}\``, inline: true },
            { name: "🔢 PIN LOGIN", value: `**${pin}**`, inline: true },
            { name: "⚠️ PENTING", value: "Jangan bagikan PIN ini kepada siapapun, termasuk staf.", inline: false }
          ],
          footer: { text: "Greenside Roleplay - Recovery System" },
          timestamp: new Date()
        }]
      }),
    });

    if (!messageRes.ok) {
      const msgError = await messageRes.json();
      console.error("Message Send Error:", msgError);
      return NextResponse.json({ error: "Gagal mengirim DM. Pastikan privasi DM Anda terbuka!" }, { status: 400 });
    }

    return NextResponse.json({ 
      message: "Sukses! Detail akun telah dikirim ke DM Discord Anda." 
    });

  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal: " + err.message }, 
      { status: 500 }
    );
  }
}