import { TAPIParams } from '@/Types'
import { baseAPI } from '../../api/baseAPI'

export const bookApi = baseAPI.injectEndpoints({
  endpoints: build => ({
    getAllProduct: build.query({
      query: params => {
        const queries = new URLSearchParams()
        if (params) {
          params?.forEach((element: TAPIParams) =>
            queries.append(element.name, element.value)
          )
        }
        return {
          url: '/products',
          method: 'GET',
          params: queries
        }
      },
      providesTags: ['Book']
    }),
    getBookById: build.query({
      query: bookId => ({
        url: `/products/${bookId}`,
        method: 'GET'
      })
    }),
    deleteBook: build.mutation({
      query: bookId => ({
        url: `/products/delete-book/${bookId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Book']
    }),
    updateProductStatus: build.mutation({
      query: payload => ({
        url: `/products/update-status`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['Book']
    }),
    updateProductFlashStatus: build.mutation({
      query: payload => ({
        url: `/products/update-flash`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['Book']
    }),
    updateBook: build.mutation({
      query: payload => ({
        url: 'products/update-book',
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['Book']
    })
  })
})

export const {
  useGetAllProductQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useUpdateProductStatusMutation,
  useUpdateProductFlashStatusMutation
} = bookApi
