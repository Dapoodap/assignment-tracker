import { getSessionUser } from "@/lib/auth/serverSession"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface ShareTaskDto {
  taskId: string
  sharedToEmail: string
}

export async function GET() {
  const user = await getSessionUser()

  const tasks = await prisma.sharedTask.findMany({
    where: {
      OR: [
        { sharedTo: { email: user.email! } },
      ],
    },
  })

  return NextResponse.json(tasks)
}

export async function POST(req: Request) {
  const user = await getSessionUser()
  const { taskId, sharedToEmail }: ShareTaskDto = await req.json()

  const task = await prisma.task.findUnique({ where: { id: taskId } })

  if (!task || task.ownerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const sharedToUser = await prisma.user.findUnique({
    where: { email: sharedToEmail },
  })

  if (!sharedToUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const existing = await prisma.sharedTask.findFirst({
    where: {
      taskId,
      sharedToId: sharedToUser.id,
    },
  })

  if (existing) {
    return NextResponse.json({ message: "Already shared" }, { status: 200 })
  }

  await prisma.sharedTask.create({
    data: {
      taskId,
      sharedToId: sharedToUser.id,
      sharedById: user.id,
    },
  })

  return NextResponse.json({ success: true })
}
