import { CreateTaskDto } from "@/constant/types/dto/task.dto"
import { getSessionUser } from "@/lib/auth/serverSession"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const user = await getSessionUser()

  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        { owner: { email: user.email! } },
      ],
    },
    include: {
      category: true,
    },
  })

  return NextResponse.json(tasks)
}

export async function POST(req: Request) {
  const user = await getSessionUser()
  const body: CreateTaskDto = await req.json()

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  })

  if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      content: body.content,
      date: new Date(body.date),
      priority: body.priority,
      categoryId: body.categoryId,
      ownerId: dbUser.id,
    },
  })

  return NextResponse.json(newTask)
}
