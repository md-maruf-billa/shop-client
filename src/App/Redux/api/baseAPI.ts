/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { logout, setUser } from '../features/user/user.slice'
import { toast } from 'sonner'

const baseQueryAPI = fetchBaseQuery({
  baseUrl: 'https://dynamic-shop-server.vercel.app/api',
  // baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', token)
    }
    return headers
  }
})

const baseQueryWithRefreshTokenVarification: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType

> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQueryAPI(args, api, extraOptions)
  if (result?.error?.status === 500) {
    const refToken = await fetch(
      'https://dynamic-shop-server.vercel.app/api/auth/refresh-token',
      // 'http://localhost:5000/api/auth/refresh-token',
      { method: 'POST', credentials: 'include' }
    )
    const { data } = await refToken.json()
    const user = (api.getState() as RootState).auth.user
    if (data?.accessToken) {
      api.dispatch(
        setUser({
          user,
          token: data.accessToken
        })
      )
      result = await baseQueryAPI(args, api, extraOptions)
    } else {
      if ((result?.error?.data as { message?: string })?.message === "Session Expired!!") {
        toast.error("Login session Expired !!")
        api.dispatch(logout())
      }
    }
  }
  return result
}

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: baseQueryWithRefreshTokenVarification,
  tagTypes: [
    'Book',
    'Review',
    'User',
    'Order',
    'CATEGORY',
    'RIDERS',
    'WEB',
    'UPDATEBANNER'
  ],
  endpoints: () => ({})
})
