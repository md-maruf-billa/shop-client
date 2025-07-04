/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from '../../api/baseAPI'

const adminAPI = baseAPI.injectEndpoints({
  endpoints: build => ({
    createNewProduct: build.mutation({
      query: formData => ({
        url: '/products',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['Book']
    }),
    getAllOrdersForAdmin: build.query({
      query: ({ searchTerm, orderStatus, paymentMethod }) => {
        // Build query parameters dynamically
        const params = new URLSearchParams();
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (orderStatus) params.append('orderStatus', orderStatus);
        if (paymentMethod) params.append('paymentMethod', paymentMethod);

        return {
          url: `/orders/all-orders?${params.toString()}`,
          method: 'GET'
        };
      },
      providesTags: ['Order']
    }),
    blockUser: build.mutation({
      query: payload => ({
        url: '/user/deactivate-user',
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: ['User']
    }),
    getAllUsers: build.query({
      query: () => ({
        url: '/user/get-all-user',
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    createCategory: build.mutation({
      query: payload => ({
        url: '/category/create-category',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['CATEGORY']
    }),
    getAllCategory: build.query({
      query: () => ({
        url: '/category',
        method: 'GET'
      }),
      providesTags: ['CATEGORY']
    }),
    deleteCategory: build.mutation({
      query: payload => ({
        url: `/category/${payload}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['CATEGORY']
    }),
    updateCategory: build.mutation<void, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['CATEGORY'],
    }),

    getAllRider: build.query({
      query: () => ({
        url: '/user/get-all-rider',
        method: 'GET'
      }),
      providesTags: ['RIDERS']
    }),
    saleReport: build.query({
      query: ({ startDate, endDate }: { startDate: string | null; endDate: string | null }) => ({
        url: `user/sale-report?start_date=${startDate}&end_date=${endDate}`,
        method: 'GET',
      }),
    }),
    dashboardReport: build.query({
      query: ({ startDate, endDate }: { startDate: any | null; endDate: any | null }) => ({
        url: `user/dashboard-report?startDate=${startDate}&endDate=${endDate}`,
        method: 'GET',
      }),
    }),

    updateWebInfo: build.mutation({
      query: payload => ({
        url: `/web/create-web-info`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['WEB']
    }),
    getWebInfo: build.query({
      query: () => ({
        url: '/web/get-web-info',
        method: 'GET'
      }),
      providesTags: ['WEB', 'UPDATEBANNER']
    }),
    updateShippingFee: build.mutation({
      query: (payload) => ({
        url: '/web/update-shipping-fee',
        method: 'PATCH',
        body: payload
      })
    }),
    createNewBanner: build.mutation({
      query: payload => ({
        url: `/web/create-banner`,
        method: 'POST',
        body: payload
      })
    }),
    deleteBanner: build.mutation({
      query: id => ({
        url: `/web/delete-banner/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['UPDATEBANNER']
    }),
    deleteShippingFee: build.mutation({
      query: id => ({
        url: `/web/delete-shipping-fee/${id}`,
        method: 'DELETE'
      })
    }),
    createNewTopBanner: build.mutation({
      query: payload => ({
        url: `/top-banner`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ["TOP-BANNER"]
    }),
    getTopBanner: build.query({
      query: () => ({
        url: '/top-banner',
        method: 'GET'
      }),
      providesTags: ["TOP-BANNER"]
    }),
    deleteTopBanner: build.mutation({
      query: id => ({
        url: `/top-banner/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['TOP-BANNER']
    }),
    addExtraSection: build.mutation({
      query: payload => ({
        url: `/section`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ["EXTRA-SECTION"]
    }),
    updateExtraSection: build.mutation({
      query: (payload: { id: string, data: { title?: string, name?: string } }) => ({
        url: `/section/${payload.id}`,
        method: 'PATCH',
        body: payload.data
      }),
      invalidatesTags: ["EXTRA-SECTION"]
    }),
    deleteExtraSection: build.mutation({
      query: id => ({
        url: `/section/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["EXTRA-SECTION"]
    }),
    getExtraSection: build.query({
      query: () => ({
        url: '/section',
        method: 'GET'
      }),
      providesTags: ["EXTRA-SECTION"]
    }),
    //end
  })
})

export const {
  useCreateNewProductMutation,
  useGetAllUsersQuery,
  useGetAllOrdersForAdminQuery,
  useBlockUserMutation,
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useGetAllRiderQuery,
  useUpdateWebInfoMutation,
  useGetWebInfoQuery,
  useCreateNewBannerMutation,
  useDeleteBannerMutation,
  useSaleReportQuery,
  useUpdateShippingFeeMutation,
  useDeleteShippingFeeMutation,
  useDashboardReportQuery,
  useUpdateCategoryMutation,
  useCreateNewTopBannerMutation,
  useGetTopBannerQuery,
  useDeleteTopBannerMutation,
  useAddExtraSectionMutation,
  useDeleteExtraSectionMutation,
  useGetExtraSectionQuery,
  useUpdateExtraSectionMutation
} = adminAPI
