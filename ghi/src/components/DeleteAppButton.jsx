import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteAppMutation } from '../app/apiSlice';


const DeleteAppButton = (props) => {
    const navigate = useNavigate()
    const [ deleteApp, deleteAppStatus ] = useDeleteAppMutation()

    const handleDelete = (e) => {
        deleteApp(props.appID)
    };


    return (
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleDelete}
        >
            Delete App
        </button>
    )

}

export default DeleteAppButton;
