import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://ecombackendsafari.up.railway.app' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ()=> ({
                url: '/api/products',
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        getProduct: builder.query({
            query: (id)=> ({
                url: `/api/products/${id}`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        searchProducts: builder.query({
            query: (searchTerm) => ({
                url: `/api/products/search?query=${searchTerm}`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        getProductsByCategory: builder.query({
            query: (category) => ({
                url: `/api/products/category/${category}`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        updateStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `/api/products/update/${id}`,
                method: 'PUT',
                body: {status}
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const { useGetProductsQuery, useGetProductQuery, useSearchProductsQuery, useGetProductsByCategoryQuery, useUpdateStatusMutation } = productApi