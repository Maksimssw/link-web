import Logo from '@/shared/ui/logo'
import Profile from '@/entities/auth/ui/profile/profile'

export default function Header() {
	return (
		<header className="w-full flex justify-between bg-primary py-2 shadow transition-colors px-3">
			<div className="flex gap-1 items-center">
				<Logo />

				<h2 className='text-xl font-bold'>Link</h2>
			</div>

			<Profile />
		</header>
	)
}