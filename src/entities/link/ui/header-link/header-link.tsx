import { Button } from '@/shared/ui/base/button'

interface Props {
	onCreate: () => void;
}

export default function HeaderLink({ onCreate }: Props) {
	return (
		<div className="flex gap-3 justify-between items-center">
			<h1>Создавайте свои собственные короткие ссылки!</h1>

			<Button onClick={onCreate}>Создать</Button>
		</div>
	)
}