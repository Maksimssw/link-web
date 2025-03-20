import API, { ResultBoolean } from '@/shared/lib/axios-client'
import { LoginType, User } from '@/entities/auth'
import { AxiosResponse } from 'axios'

const loginMutationFn = async (data: LoginType) => {
  return API.post('session/login', data);
}

const meQueryFn = async (): Promise<AxiosResponse<User>> => {
  return API.get('session/me');
}

const clearSessionFn = async (): Promise<AxiosResponse<ResultBoolean>> => {
  return API.get('session/clear');
}

export const api = {
  loginMutationFn,
  meQueryFn,
  clearSessionFn
} as const;