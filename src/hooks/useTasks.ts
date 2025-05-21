import { CreateTaskDto } from '@/constant/types/dto/task.dto'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'


export const useGetMyTasks = () => {
  return useQuery({
    queryKey: ['my_tasks'],
    queryFn: async () => {
      const res = await axios.get('/api/task')
      return res.data
    },
  })
}
export const useGetSharedToMeTasks = () => {
  return useQuery({
    queryKey: ['shared_to_me_tasks'],
    queryFn: async () => {
      const res = await axios.get('/api/task/shared')
      return res.data
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateTaskDto) => {
      const res = await axios.post('/api/task', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
    },
  })
}

export const useUpdateTask = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Partial<CreateTaskDto>) => {
      const res = await axios.put(`/api/task/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/task/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
    },
  })
}
