import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

let resendClient: Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  company: z.string().trim().max(0).optional().default(""),
});

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
    const resend = getResendClient();
    const ip =
      req.headers.get("x-vercel-forwarded-for") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const parsed = contactSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide valid contact details and a message." },
        { status: 400 },
      );
    }

    const { name, email, subject, message, company } = parsed.data;

    if (company) {
      return NextResponse.json({ success: true });
    }

    const escapeHtml = (text: string) => {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (char) => map[char]);
    };

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedSubject = escapeHtml(subject || "");
    const escapedMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const ownerEmailResult = await resend.emails.send({
      from: "Contact form from Oluwagbotemi.io <contact@oluwagbotemi.space>",
      to: "adelajaoluwagbotemi00@gmail.com",
      subject: escapedSubject || `New message from ${escapedName}`,
      replyTo: email,
      text: `New Contact Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "No subject"}\nIP Address: ${ip}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color: #333;">
          <h2 style="color: #000; margin-bottom: 24px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${escapedName}</p>
          <p><strong>Email:</strong> ${escapedEmail}</p>
          <p><strong>Subject:</strong> ${escapedSubject || "No subject"}</p>
          <p><strong>IP Address:</strong> ${ip}</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;"/>
          <div style="white-space: pre-wrap; word-wrap: break-word;">
            <p><strong>Message:</strong></p>
            <p>${escapedMessage}</p>
          </div>
        </div>
      `,
    });

    if (ownerEmailResult.error) {
      throw ownerEmailResult.error;
    }

    const autoReplyResult = await resend.emails.send({
      from: "Oluwagbotemi.io <contact@oluwagbotemi.space>",
      to: email,
      subject: "Thanks for contacting me!",
      text: `Hi ${name},\n\nThanks for reaching out. I've received your message and will get back to you shortly.\n\nOluwagbotemi`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color: #333;">
          <p>Hi ${escapedName},</p>
          <p>Thanks for reaching out. I've received your message and will get back to you shortly.</p>
          <p style="margin-top: 24px; color: #666;">— Oluwagbotemi</p>
        </div>
      `,
    });

    if (autoReplyResult.error) {
      throw autoReplyResult.error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
