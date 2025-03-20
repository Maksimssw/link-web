import { AxiosResponse } from 'axios'
import API from '@/shared/lib/axios-client'
import { Analytics } from '@/entities/analytics/store'

const analyticsQueryFn = async (alias: string): Promise<AxiosResponse<Analytics[]>> => {
	return API.get(`analytics/${alias}`);
}

export const api = {
	analyticsQueryFn
} as const;