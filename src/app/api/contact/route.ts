import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
    }

    const prisma = getPrisma();
    await prisma.lead.create({
      data: { name, email, message },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    const errorMessage = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
