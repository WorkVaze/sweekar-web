# Sweekaar Productions

A single-page portfolio and enquiry site built with Next.js.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Enquiry delivery

Enquiries are stored in [Neon Postgres](https://neon.tech) and a notification is sent via Mailgun.

1. Create a Neon database and run [db/schema.sql](./db/schema.sql) in its SQL editor.
2. Copy `.env.example` to `.env.local` and provide the connection string and Mailgun details.
3. Add the same variables to Vercel under Project Settings → Environment Variables.

The Mailgun domain must be verified. Set `ENQUIRY_TO_EMAIL` to the address that should receive the notification.
