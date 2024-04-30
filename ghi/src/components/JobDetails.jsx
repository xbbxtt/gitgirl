import React from 'react';
import { useJobDetailsQuery } from "../app/apiSlice";
import { useParams } from 'react-router-dom';


function JobDetails() {

    const params = useParams()
    console.log({params})
    const { data, isLoading } = useJobDetailsQuery(params.jobID)
    console.log({data, isLoading})


    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <ul>
                <li>Job ID: {data.id}</li>
                <li>Position Title: {data.position_title}</li>
                <li>Company Name: {data.company_name}</li>
                <li>Description: {data.description}</li>
                <li>Creator ID: {data.creator_id}</li>
            </ul>
        </div>
    )
}


export default JobDetails;
