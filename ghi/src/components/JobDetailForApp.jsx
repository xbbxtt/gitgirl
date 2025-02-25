import { useJobDetailsQuery } from '../app/apiSlice';


const JobDetailForApp = (props) => {
    const { data: jobDetail, isLoading } = useJobDetailsQuery(props.jobID);

    if (isLoading) {
        return (
        <>
            <td>Loading..</td>
            <td>Loading..</td>
        </>
        );
    };

    return (
        <>
            <td>{jobDetail.company_name}</td>
            <td>{jobDetail.position_title}</td>
        </>
    );
};

export default JobDetailForApp;
