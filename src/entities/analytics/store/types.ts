
export interface AnalyticsState {
	analytics: Analytics[];

	setAnalytics(analytics: Analytics[]): void;
}

export interface Analytics {
	id: string
	ip: string
	country: string
	city: string
	latidute: number
	longitude: number
	browser: string
	os: string
	type: string
	linkId: string
	createAt: Date
}