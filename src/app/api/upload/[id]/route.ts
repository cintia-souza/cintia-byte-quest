import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const image = await prisma.image.findUnique({ where: { id: Number(id) } });

  if (!image) {
    return NextResponse.json({ error: "Imagem não encontrada" }, { status: 404 });
  }

  const [meta, base64] = image.dataUrl.split(",");
  const contentType = meta.match(/data:(.*);/)?.[1] || "image/png";
  const buffer = Buffer.from(base64, "base64");

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
