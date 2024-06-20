import {useEffect, useState} from "react";

const useLoading = (status: string) => {

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        if (status === 'failed') {
            setLoading(false);
            // setTimeout(() => {
            //     setLoading(false);
            // }, 3000);
        }
    }, [loading, status]);

    return loading
}


export {useLoading}