import LinkList from '@/widgets/link/link-list'
import HeaderLink from '@/entities/link/ui/header-link/header-link'
import { CreateLink } from '@/features/link/create-link/create-link'
import { useIsBoolean } from '@/shared/lib/use/useIsBoolean'

export default function HomePage() {
	const {toggle, boolean} = useIsBoolean()

	return (
		<section className='w-full inline-flex justify-center h-auto max-w-full pt-10'>
			<div className="w-[800px] grid gap-10">
				<HeaderLink onCreate={toggle} />
				<LinkList  />

				<CreateLink props={boolean} onClose={toggle} />
			</div>
		</section>
	)
}