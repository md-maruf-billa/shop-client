import { baseAPI } from '../../api/baseAPI'

export const userAPI = baseAPI.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      })
    }),
    register: build.mutation({
      query: data => ({
        url: '/auth/create-user',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['RIDERS']
    }),

    sendReview: build.mutation({
      query: payload => ({
        url: `/products/review`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['Review']
    }),
    getReviews: build.query({
      query: bookId => ({
        url: `/products/review/${bookId}`,
        method: 'GET'
      }),
      providesTags: ['Review']
    }),
    updateProfile: build.mutation({
      query: payload => ({
        url: '/user/update-profile',
        method: 'PATCH',
        body: payload
      })
    }),

    updatePassword: build.mutation({
      query: payload => ({
        url: '/user/update-password',
        method: 'PUT',
        body: payload
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendReviewMutation,
  useGetReviewsQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation
} = userAPI
