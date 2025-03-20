import { Analytics } from '@/entities/analytics'
import { TableCell, TableRow } from '@/shared/ui/base/table'
import { dateFormat } from '@/shared/lib/date'

interface Props {
	analytics: Analytics
}

export default function AnalyticsItem({analytics}: Props) {
	return (
		<TableRow>
			<TableCell className="font-medium">{analytics.ip}</TableCell>
			<TableCell>{analytics.country}</TableCell>
			<TableCell>{analytics.city}</TableCell>
			<TableCell>{analytics.latidute}</TableCell>
			<TableCell>{analytics.longitude}</TableCell>
			<TableCell>{analytics.browser}</TableCell>
			<TableCell>{analytics.os}</TableCell>
			<TableCell>{analytics.type}</TableCell>
			<TableCell>{dateFormat(analytics.createAt)}</TableCell>
		</TableRow>
	)
}