/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreateTaskDto {
  title: string
  content: any
  date: string // ISO
  priority: "low" | "medium" | "high"
  categoryId: string
  completed: boolean

}
export interface CreateCategoryDto {
  name: string
}
export interface CategoryResponse {
    id: string
    name: string
}

export interface TaskResponseDto {
  id: string
  title: string
  content: any
  completed: boolean
  date: string
  priority: string
  category: CategoryResponse
  createdAt: string
  updatedAt: string
}
