import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const runtime = "edge";

type Enquiry = { name?: string; email?: string; projectType?: string; message?: string };

function isEnquiry(value: Enquiry): value is Required<Enquiry> {
  return [value.name, value.email, value.projectType, value.message].every(
    (field) => typeof field === "string" && field.trim().length > 0,
  );
}

export async function POST(request: Request) {
  const enquiry = (await request.json()) as Enquiry;

  if (!isEnquiry(enquiry) || !/^\S+@\S+\.\S+$/.test(enquiry.email)) {
    return NextResponse.json({ error: "Please provide all enquiry details." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL || !process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN || !process.env.ENQUIRY_TO_EMAIL) {
    console.error("Enquiry integration is missing required environment variables.");
    return NextResponse.json({ error: "The enquiry service is not configured." }, { status: 503 });
  }

  const sql = neon(process.env.DATABASE_URL);
  const name = enquiry.name.trim();
  const email = enquiry.email.trim();
  const projectType = enquiry.projectType.trim();
  const message = enquiry.message.trim();

  await sql`INSERT INTO enquiries (name, email, project_type, message) VALUES (${name}, ${email}, ${projectType}, ${message})`;

  const mailgunResponse = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`api:${process.env.MAILGUN_API_KEY}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      from: `Sweekaar Productions <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to: process.env.ENQUIRY_TO_EMAIL,
      subject: `New ${projectType} enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`,
      "h:Reply-To": email,
    }),
  });

  if (!mailgunResponse.ok) {
    console.error("Mailgun was unable to send the enquiry notification.");
    return NextResponse.json({ error: "Your enquiry was saved but the email notification failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
