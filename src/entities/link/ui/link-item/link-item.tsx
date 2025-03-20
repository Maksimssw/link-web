import { api, Link as ILink, useLinkStore } from '@/entities/link'
import { ExternalLink, Trash } from 'lucide-react'
import { Button } from '@/shared/ui/base/button'
import { API_URL } from '@/shared/config'
import { dateFormat } from '@/shared/lib/date'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/shared/hook/use-toast'
import { Link } from 'react-router-dom'

export default function LinkItem({props}: {props: ILink}) {
	const {removeLink} = useLinkStore()
	const linkAlias = API_URL + `/link/${props.alias}`

	const { isPending, mutateAsync } = useMutation({
		mutationFn: api.removeLinkMutationFn,
	});

	const removeHandler = async () => {
		try {
			await mutateAsync(props.alias)

			removeLink(props.id)

			toast({
				title: "Ссылка",
				description: "Ссылка успешно удалена!",
				variant: "default",
			});
		} catch (error: any) {
			toast({
				title: "Ошибка",
				description: error.message,
				variant: "destructive",
			});
		}
	}

	return (
		<li className='border-chart-1 border p-2 rounded-md'>
			<div className="flex justify-between items-center">
				<div className="grid">
					<span>Alias: <b className='text-primary text-xl'>{props.alias}</b> </span>
					<span>Оригинальная ссылка: <b className='text-primary'>{props.originalUrl}</b> </span>
					<span>Короткая ссылка: <b className='text-primary'>{linkAlias}</b></span>
					{props.expiresAt && <span>Дата окончания: {dateFormat(props.expiresAt)}</span>}
				</div>

				<div className="flex gap-3 justify-between items-center">
					<a href={linkAlias} target='_blank'>
						<ExternalLink size={24} />
					</a>

					<button onClick={removeHandler} disabled={isPending}>
						<Trash size={24} />
					</button>
				</div>
			</div>

			<div className="flex justify-end">
				<Link to={`/analytics/${props.alias}`}>
					<Button >
						Аналитика
					</Button >
				</Link>
			</div>
		</li>
	)
}