import { baseAPI } from '../../api/baseAPI'

export const orderAPI = baseAPI.injectEndpoints({
  endpoints: build => ({
    createOrder: build.mutation({
      query: payload => ({
        url: '/orders',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['Order']
    }),
    updateOrderStatus: build.mutation({
      query: (payload: { id: string; status: string }) => {
        return {
          url: `/orders/update-order-status/${payload.id}`,
          method: 'PUT',
          body: { status: payload.status }
        }
      },
      invalidatesTags: ['Order']
    }),
    verifyOrder: build.query({
      query: orderId => ({
        url: `/orders/verify-order/${orderId}`,
        method: 'GET'
      })
    }),
    getAllOrders: build.query({
      query: userEmail => ({
        url: `/orders/get-orders/${userEmail}`,
        method: 'GET'
      }),
      providesTags: ['Order']
    }),
    assignRiders: build.mutation({
      query: (payload: { id: string; rider: string }) => ({
        url: `/orders/assign-rider/${payload.id}`,
        method: 'PUT',
        body: { rider: payload.rider }
      }),
      invalidatesTags: ['Order']
    }),
    getAllAssignOrder: build.query({
      query: ({ riderId, orderStatus }) => ({
        url: `/orders/rider-assigned-order/${riderId}?orderStatus=${orderStatus}`,
        method: 'GET',
      }),
    }),
    //
  })
})

export const {
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useAssignRidersMutation,
  useGetAllAssignOrderQuery
} = orderAPI
