import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const partApi = createApi({
    reducerPath: 'partApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ["Part"],
    endpoints: (builder) => ({
        getParts: builder.query({
            query: (id) => ({
                url: `/api/parts/${id}`,
                method: 'GET'
            }),
            providesTags: ['Part']
        })
    })
})

export const { useGetPartsQuery } = partApi

