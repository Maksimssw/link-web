import API, { ResultBoolean } from '@/shared/lib/axios-client'
import { AxiosResponse } from 'axios'
import { CreateLink, Link } from '@/entities/link'

const linksQueryFn = async (): Promise<AxiosResponse<Link[]>> => {
	return API.get('/link/info/');
}

const createLinkMutationFn = async (data: CreateLink): Promise<AxiosResponse<Link>> => {
	return API.post('/link/shorten', data);
}

const removeLinkMutationFn = async (alias: string): Promise<AxiosResponse<ResultBoolean>> => {
	return API.delete(`link/${alias}`)
}

export const api = {
	linksQueryFn,
	createLinkMutationFn,
	removeLinkMutationFn
} as const;