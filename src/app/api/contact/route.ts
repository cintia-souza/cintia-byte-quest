import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return NextResponse.json({ error: "DATABASE_URL não configurada" }, { status: 500 });
    }

    const sql = neon(databaseUrl);
    await sql`INSERT INTO leads (name, email, message) VALUES (${name}, ${email}, ${message})`;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    const errorMessage = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
