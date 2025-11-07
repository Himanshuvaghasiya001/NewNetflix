import React, { useEffect } from "react";
import Movies from "../components/Movies";
import LoaderScreen from "../utils/Shimmer";

const Home = () => {

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <LoaderScreen />
    }
    return (
        <>

            <Movies />

        </>

    );
};


export default Home;
