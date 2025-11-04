import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (formData) => ({
                url: '/api/users',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: (formData) => ({
                url: '/api/users/login',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ["User"]
        }),
        updateUser: builder.mutation({
            query: ({id, formData}) => ({
                url: `/api/users/edit/${id}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {useRegisterUserMutation, useLoginUserMutation, useUpdateUserMutation} = userApi