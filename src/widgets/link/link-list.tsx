import { api, useLinkStore } from '@/entities/link'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import LinkItem from '@/entities/link/ui/link-item/link-item'

export default function LinkList () {
	const {links, setLinks} = useLinkStore()

	const { data, isLoading, isError } = useQuery({
		queryKey: ["links"],
		queryFn: api.linksQueryFn,
		enabled: true,
		staleTime: Infinity,
	});

	useEffect(() => {
		if (data?.data) {
			setLinks(data.data)
		}
	}, [data])

	if (isLoading) return <div>Загрузка...</div>

	if (isError) return <div>Ошибка!</div>

	return (
		<ul className='grid gap-3'>
			{links.length > 0 ? (
				links.map((link) => (
					<LinkItem props={link} key={link.id} />
				))
			) : (
				<li>Список ссылок пуст.</li>
			)}
		</ul>
	)
}