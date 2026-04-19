import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1️⃣ Send email to YOU
    await resend.emails.send({
      from: "Portfolio Contact <contact@oluwagbotemi.space>",
      to: "adelajaoluwagbotemi00@gmail.com",
      subject: subject || `New message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 2️⃣ Auto-reply to sender
    await resend.emails.send({
      from: "Oluwagbotemi <contact@oluwagbotemi.space>",
      to: email,
      subject: "Message received",
      html: `
        <p>Hi ${name},</p>

        <p>Thanks for reaching out. I’ve received your message and will get back to you shortly.</p>

        <p>Best regards,<br/>Oluwagbotemi</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}