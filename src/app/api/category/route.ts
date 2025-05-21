import { CreateCategoryDto } from "@/constant/types/dto/task.dto"
import { getSessionUser } from "@/lib/auth/serverSession"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const user = await getSessionUser()

  if (!user) {
    throw new NextResponse(
      JSON.stringify({ error: "Unauthorized: Authentication required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const tasks = await prisma.category.findMany()

  return NextResponse.json(tasks)
}

export async function POST(req: Request) {
  const user = await getSessionUser()
  const body: CreateCategoryDto = await req.json()
 if (!user) {
    throw new NextResponse(
      JSON.stringify({ error: "Unauthorized: Authentication required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  })

  if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const newTask = await prisma.category.create({
    data: {
      name: body.name,
    },
  })

  return NextResponse.json(newTask)
}
