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
        listAllJobsByPoster: builder.query({
            query: () => ({
                url: `/api/jobs/mine`
            }),
            providesTags: [{type: 'Jobs', id: 'mine' }]
        }),
        jobDetails: builder.query({
            query: (jobID) => ({
                url: `/api/jobs/${jobID}`
            })
        }),
        createJob: builder.mutation({
            query: (body) => ({
                url: `/api/jobs`,
                method: 'POST',
                body
            })
        }),
        deleteJob: builder.mutation({
            query: (jobID) => ({
                url: `/api/jobs/${jobID}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Jobs', id: 'mine' }]
        }),
        listAllAppsForJobseeker: builder.query({
            query: () => ({
                url: `/api/applications/mine`
            }),
            providesTags: [{type: 'Applications', id: 'mine' }]
        }),
        listAllAppsForPosterByJob: builder.query({
            query: (jobID) => ({
                url: `/api/jobs/${jobID}/applications`
            })
        }),
        createApp: builder.mutation({
            query: (jobID) => ({
                url: `/api/jobs/${jobID}/applications`,
                method: 'POST'
            }),
            invalidatesTags: [{type: 'Applications', id: 'mine'}]
        }),
        deleteApp: builder.mutation({
            query: (appID) => ({
                url: `/api/applications/${appID}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Applications', id: 'mine' }]
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
    useLazyListAllJobsQuery,
    useListAllJobsByPosterQuery,
    useLazyListAllJobsByPosterQuery,
    useJobDetailsQuery,
    useLazyJobDetailsQuery,
    useCreateJobMutation,
    useDeleteJobMutation,
    useListAllAppsForJobseekerQuery,
    useLazyListAllAppsForJobseekerQuery,
    useListAllAppsForPosterByJobQuery,
    useLazyListAllAppsForPosterByJobQuery,
    useCreateAppMutation,
    useDeleteAppMutation,
    useAuthenticateQuery,
    useSignoutMutation,
    useSigninMutation,
    useSignupMutation
} = gitGirlApi
