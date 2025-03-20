import React from "react";
import Header from '@/widgets/header/header'

interface Props {
	className?: string;
	children: React.ReactNode;
}

export const MainLayout: React.FC<Props>  = ({className, children}) => {
	return (
		<main>
			<Header />

			{children}
		</main>
	)
}