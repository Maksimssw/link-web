import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/base/table"
import { Analytics } from '@/entities/analytics'
import AnalyticsItem from '@/entities/analytics/ui/analytics-item/analytics-item'

interface Props {
	analytics: Analytics[]
}

export default function AnalyticsList({analytics}: Props) {
	return (
		<Table>
			<TableCaption>Список последних переходов</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>IP</TableHead>
					<TableHead>Старна</TableHead>
					<TableHead>Город</TableHead>
					<TableHead>Широта</TableHead>
					<TableHead>Долгота</TableHead>
					<TableHead>Браузер</TableHead>
					<TableHead>OS</TableHead>
					<TableHead>Тип</TableHead>
					<TableHead>Дата</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{analytics.map(item => (
					<AnalyticsItem key={item.id} analytics={item} />
				))}
			</TableBody>
		</Table>

	);
}