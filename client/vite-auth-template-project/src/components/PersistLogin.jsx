import { Outlet } from "react-router-dom";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { useQuery } from "react-query";

const PersistLogin = () => {
    // const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();
    
    const { isLoading, isError, error, data } = useQuery(
        "refreshToken",
        refresh,
        {
            retry:false,
            enabled: !auth?.accessToken && persist
        }
    );

    if(isError) console.error(error);
    
    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin