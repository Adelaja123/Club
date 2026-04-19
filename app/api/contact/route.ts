import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const runtime = "nodejs";

// simple in-memory rate limit (per IP)
const RATE_LIMIT = 5; // requests
const WINDOW_MS = 60 * 1000; // 1 min

const ipStore = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - entry.timestamp > WINDOW_MS) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // 🚫 rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const { name, email, subject, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 📩 email to YOU (clean HTML)
    await resend.emails.send({
      from: "Contact form from Oluwagbotemi.io <contact@oluwagbotemi.space>",
      to: "adelajaoluwagbotemi00@gmail.com",
      subject: subject || `New message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>IP:</strong> ${ip}</p>
          <hr/>
          <p>${message}</p>
        </div>
      `,
    });

    // 📬 auto-reply
    await resend.emails.send({
      from: "Oluwagbotemi.io <contact@oluwagbotemi.space>",
      to: email,
      subject: "Thanks for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <p>Hi ${name},</p>
          <p>Thanks for reaching out. I've received your message and will get back to you shortly.</p>
          <p>— Oluwagbotemi</p>
        </div>
      `,
    });

    // 📊 basic logging (server console)
    console.log("New contact:", {
      name,
      email,
      subject,
      ip,
      time: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
