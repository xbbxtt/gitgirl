import React from 'react';
import { useListAllJobsQuery } from "../app/apiSlice";


function ListAllJobs() {
    const { data, isLoading } = useListAllJobsQuery()
    console.log({data, isLoading})

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            {data.jobs.map((job) => {
                return(
                    <ul key={job.id}>
                        <li>Job ID: {job.id}</li>
                        <li>Position Title: {job.position_title}</li>
                        <li>Company Name: {job.company_name}</li>
                        <li>Description: {job.description}</li>
                        <li>Creator ID: {job.creator_id}</li>
                    </ul>
                );
        })}
        </div>
    )
}


export default ListAllJobs;
