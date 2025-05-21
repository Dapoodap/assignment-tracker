import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('/api/category')
      return res.data
    },
  })
}
// export const useGetSharedToMeTasks = () => {
//   return useQuery({
//     queryKey: ['shared_to_me_tasks'],
//     queryFn: async () => {
//       const res = await axios.get('/api/task/shared')
//       return res.data
//     },
//   })
// }

// export const useCreateTask = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: async (data: CreateTaskDto) => {
//       const res = await axios.post('/api/task', data)
//       return res.data
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
//     },
//   })
// }

// export const useUpdateTask = (id: string) => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: async (data: Partial<CreateTaskDto>) => {
//       const res = await axios.put(`/api/task/${id}`, data)
//       return res.data
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
//     },
//   })
// }

// export const useDeleteTask = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: async (id: string) => {
//       await axios.delete(`/api/task/${id}`)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['my_tasks'] })
//     },
//   })
// }
