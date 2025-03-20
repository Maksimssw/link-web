import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/base/button'

export default function SuccessfulRegistration () {
	return (
		<div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
			<div className="size-[48px]">
				<Check size="48px" className="animate-bounce"/>
			</div>
			<h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
				You have successfully created an account
			</h2>
			<Link to="/auth">
				<Button className="h-[40px]">
					Go to login
					<ArrowRight />
				</Button>
			</Link>
		</div>
	)
}