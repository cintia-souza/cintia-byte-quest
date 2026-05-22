import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const data = await request.json();
  const project = await prisma.project.create({ data });
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id, ...data } = await request.json();
  const project = await prisma.project.update({ where: { id }, data });
  return NextResponse.json(project);
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await request.json();
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
