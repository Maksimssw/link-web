import { create } from 'zustand/index'
import { Analytics, AnalyticsState } from '@/entities/analytics'

export const  useAnalyticsStore = create<AnalyticsState>((set, get) => ({
	analytics: [],

	setAnalytics: (analytics: Analytics[]): void => {
		set({analytics})
	}
}))