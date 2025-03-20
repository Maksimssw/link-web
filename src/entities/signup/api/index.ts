import API from "@/shared/lib/axios-client";
import { RegisterData } from '@/entities/signup/store'

const registerMutationFn = async (data: RegisterData) => {
	return API.post('account/create', data);
}

export const api = {
	registerMutationFn
} as const;