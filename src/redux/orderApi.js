import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ecombackendsafari.up.railway.app',
        prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user?.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
            return headers
        }
        }
     }),
     tagTypes: ['Order'],
     endpoints: (builder) => ({
        getOrders: builder.query({
            query: ()=> ({
                url: '/api/orders',
                method: 'GET'
            }),
            providesTags: ['Order']
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `/api/orders/${id}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        }),
        getUserOrders: builder.query({
            query: (id) => ({
                url: `/api/orders/user/${id}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        }),
        createOrder: builder.mutation({
            query: ({ user_id, title, cart, subtotal, tax_price, event_date, itemsPrice, taxPrice, shippingPrice, total_price }) => ({
              url: `/api/orders`,
              method: 'POST',
              body: { user_id, title, order_items: cart, subtotal, tax_price, event_date, itemsPrice, taxPrice, shippingPrice, total_price }
            }),
            invalidatesTags: ['Order']
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/api/orders/update/${id}`,
                method: 'PUT',
                body: {status}
            }),
            invalidatesTags: ['Order']
        }),
        getOrderItems: builder.query({
            query: (id) => ({
                url: `/api/orders/items/${id}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        })
     })
})

export const { useGetOrdersQuery, useGetUserOrdersQuery, useGetOrderByIdQuery, useCreateOrderMutation, useUpdateOrderStatusMutation, useGetOrderItemsQuery } = orderApi