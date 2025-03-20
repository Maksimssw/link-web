import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import AnalyticsList from '@/widgets/analytics/analytics-list'
import { api } from '@/entities/analytics'
import { useAnalyticsStore } from '@/entities/analytics/store/store'
import { useEffect } from 'react'

export default function AnalyticsPage() {
	const { alias } = useParams<string>();
	const {analytics, setAnalytics} = useAnalyticsStore()

	if (!alias) return <div>Ошибка ID обязателен!</div>

	const { data, isLoading, isError } = useQuery({
		queryKey: ["analytics", alias],
		queryFn: () => api.analyticsQueryFn(alias),
		staleTime: Infinity,
	});

	useEffect(() => {

		if (data?.data) setAnalytics(data?.data);
	}, [data])

	if (isLoading || !data) return <Loader />;

	if (isError) return <div>Ошибка!</div>

	return (
		<AnalyticsList analytics={analytics} />
	)
}