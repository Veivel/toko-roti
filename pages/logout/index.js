import { useEffect } from "react";
import useGlobalStore from "../../components/store";

const Logout = () => {
    useGlobalStore.setState({ accessToken: 'none'});
    
    useEffect(() => {
        localStorage.clear();
        //pause 5 seconds...
        //window.location.replace("/login/");
    }, []);

    return (
        <div>
            <p>Logged out successfully.</p>
        </div>
    )
}

export default Logout;