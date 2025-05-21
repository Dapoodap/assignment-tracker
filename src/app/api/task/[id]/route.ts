import { getSessionUser } from "@/lib/auth/serverSession"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser()
  const task = await prisma.task.findUnique({
    where: { id: params.id },
    include: { category: true },
  })

  if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })

  const isOwner = task.ownerId === user.id
  const isShared = await prisma.sharedTask.findFirst({
    where: {
      taskId: task.id,
      sharedTo: { email: user.email! },
    },
  })

  if (!isOwner && !isShared) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  return NextResponse.json(task)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser()
  const task = await prisma.task.findUnique({ where: { id: params.id } })

  if (!task || task.ownerId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const data = await req.json()

  const updated = await prisma.task.update({
    where: { id: params.id },
    data,
  })

  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const user = await getSessionUser()
  const task = await prisma.task.findUnique({ where: { id: params.id } })

  if (!task || task.ownerId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  await prisma.task.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
