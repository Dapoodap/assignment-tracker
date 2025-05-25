import { UpdateTaskDto } from "@/constant/types/dto/task.dto"
import { getSessionUser } from "@/lib/auth/serverSession"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET - Mengambil task berdasarkan ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    const { id: taskId } = await params

    // Validasi apakah ID valid
    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" }, 
        { status: 400 }
      )
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        owner: { email: user.email! }
      },
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!task) {
      return NextResponse.json(
        { error: "Task not found or access denied" }, 
        { status: 404 }
      )
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error fetching task:', error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}

// PUT - Update task secara penuh
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    const { id: taskId } = await params
    const body: UpdateTaskDto = await req.json()

    // Validasi apakah ID valid
    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" }, 
        { status: 400 }
      )
    }

    // Cek apakah task ada dan milik user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        owner: { email: user.email! }
      }
    })

    if (!existingTask) {
      return NextResponse.json(
        { error: "Task not found or access denied" }, 
        { status: 404 }
      )
    }

    // Update task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: body.title,
        content: body.content,
        date: body.date ? new Date(body.date) : undefined,
        priority: body.priority,
        categoryId: body.categoryId,
        completed: body.completed,
        updatedAt: new Date()
      },
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}

// PATCH - Update sebagian field task
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    const { id: taskId } = await params
    const body: Partial<UpdateTaskDto> = await req.json()

    // Validasi apakah ID valid
    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" }, 
        { status: 400 }
      )
    }

    // Cek apakah task ada dan milik user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        owner: { email: user.email! }
      }
    })

    if (!existingTask) {
      return NextResponse.json(
        { error: "Task not found or access denied" }, 
        { status: 404 }
      )
    }

    // Buat object update hanya dengan field yang dikirim
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { updatedAt: new Date() }
    
    if (body.title !== undefined) updateData.title = body.title
    if (body.content !== undefined) updateData.content = body.content
    if (body.date !== undefined) updateData.date = new Date(body.date)
    if (body.priority !== undefined) updateData.priority = body.priority
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId
    if (body.completed !== undefined) updateData.completed = body.completed

    // Update task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error('Error patching task:', error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}

// DELETE - Hapus task
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    const { id: taskId } = await params

    // Validasi apakah ID valid
    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" }, 
        { status: 400 }
      )
    }

    // Cek apakah task ada dan milik user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        owner: { email: user.email! }
      }
    })

    if (!existingTask) {
      return NextResponse.json(
        { error: "Task not found or access denied" }, 
        { status: 404 }
      )
    }

    // Hapus task
    await prisma.task.delete({
      where: { id: taskId }
    })

    return NextResponse.json(
      { message: "Task deleted successfully" }, 
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}