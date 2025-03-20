import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/base/button'

export default function NotFoundPage() {
	return (
		<div className='w-full h-full flex flex-col items-center justify-center'>
			<h1>Not Found Page</h1>

			<Link to="/">
				<Button>Home</Button>
			</Link>
		</div>
	)
}