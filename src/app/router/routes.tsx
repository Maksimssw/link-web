import { createBrowserRouter } from 'react-router-dom'
import App from '@/app/App'
import SignUpPage from '@/page/sign-up/signup-page'
import NotFoundPage from '@/page/not-found/not-found-page'
import AuthPage from '@/page/auth/auth-page'
import HomePage from '@/page/home/home-page'
import AnalyticsPage from '@/page/analytics/analytics-page'

export const router = createBrowserRouter([
	{ path: '/', element: <App/>, children: [
			{ path: '/', element: <HomePage /> },
			{ path: '/auth', element: <AuthPage/> },
			{ path: '/signup', element: <SignUpPage/> },
			{ path: '/analytics/:alias', element: <AnalyticsPage/> },
			{ path: "*", element: <NotFoundPage /> },
		]}
]);

