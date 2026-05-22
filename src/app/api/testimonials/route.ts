import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const data = await request.json();

  // Cliente enviando depoimento (sem auth)
  if (!data._admin) {
    const testimonial = await prisma.testimonial.create({
      data: { name: data.name, role: data.role || "", message: data.message },
    });
    return NextResponse.json(testimonial, { status: 201 });
  }

  // Admin gerenciando
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(testimonials);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id, ...data } = await request.json();
  const testimonial = await prisma.testimonial.update({ where: { id }, data });
  return NextResponse.json(testimonial);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await request.json();
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
