import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const gitGirlApi = createApi({
    reducerPath: 'gitGirlApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        listAllJobs: builder.query({
            query: () => ({
                url: `/api/jobs`
            })
        }),
        jobDetails: builder.query({
            query: (jobID) => ({
                url: `/api/jobs/${jobID}`
            })
        }),
        authenticate: builder.query({
            query: () => ({
                url: `/api/auth/authenticate`
            }),
            providesTags: ['User']
        }),
        signout: builder.mutation({
            query: () => ({
                url: `/api/auth/signout`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
        signin: builder.mutation({
            query: (body) => ({
                url: `/api/auth/signin`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: `/api/auth/signup`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        })

    })
})

export const {
    useListAllJobsQuery,
    useJobDetailsQuery,
    useAuthenticateQuery,
    useSignoutMutation,
    useSigninMutation,
    useSignupMutation,

} = gitGirlApi
