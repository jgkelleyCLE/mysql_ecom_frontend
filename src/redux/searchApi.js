import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001',
        prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user?.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
            return headers
        }
        }
     }),
     tagTypes: ['Search'],
     endpoints: (builder) => ({
        getAllSearches: builder.query({
            query: ()=> ({
                url: '/api/search',
                method: 'GET'
            }),
            providesTags: ['Search']
        }),
        createSearch: builder.mutation({
            query: ({ term, user_id, results_count, result_ids }) => ({
                url: '/api/search',
                method: 'POST',
                body: { term, user_id, results_count, result_ids }
            }),
            invalidatesTags: ['Search']
        }),
        getSearchById: builder.query({
            query: (id) => ({
                url: `/api/search/${id}`,
                method: 'GET'
            }),
            providesTags: ['Search']
        }),
        getSearchDetails: builder.query({
            query: (id) => ({
                url: `/api/search/details/${id}`,
                method: 'GET'
            }),
            providesTags: ['Search']
        })
     })
})

export const { useGetAllSearchesQuery, useCreateSearchMutation, useGetSearchByIdQuery, useGetSearchDetailsQuery } = searchApi