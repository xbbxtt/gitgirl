import React from 'react';
import { useDeleteJobMutation } from '../app/apiSlice';


const DeleteJobButton = (props) => {
    const [ deleteJob, deleteJobStatus ] = useDeleteJobMutation()

    const handleDeleteJob = (jobID) => {
        deleteJob(props.jobID)
    };


    return (
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleDeleteJob}
        >
            Delete Job
        </button>
    )

}

export default DeleteJobButton;
