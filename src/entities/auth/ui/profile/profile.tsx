import { api, useAuthStore } from '@/entities/auth'
import { LogOut } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/shared/hook/use-toast'

export default function Profile () {
	const {user} = useAuthStore()
	const navigate = useNavigate();

	const { isPending, isError, mutateAsync } = useMutation({
		mutationFn: api.clearSessionFn,
	});

	if (!user)
		return <div>Загрузка...</div>

	if (isError)
		return <div>Ошибка...</div>

	const clearSessionHandler = async () => {
		try {
			await mutateAsync();
			navigate("/auth");

			toast({
				title: "Успешно",
				description: 'Вы успешно вышли из учетной записи',
				variant: "default",
			});
		} catch (error: any) {
			toast({
				title: "Ошибка",
				description: error.message,
				variant: "destructive",
			});
		}
	};

	return (
		<div className='flex gap-3 items-center'>
			<div className="grid">
				<span>username: {user.username}</span>
				<span>email: {user.email}</span>
			</div>

			<button onClick={clearSessionHandler} disabled={isPending}>
				<LogOut size={16}/>
			</button>
		</div>
	)
}