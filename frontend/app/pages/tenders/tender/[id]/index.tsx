import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import HomeBar from "../../../components/HomeBar";
const Tender = () => {
    const [loggedUser, setLoggedUser] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('authToken') == null) {
            router.push('/login');
        }
        else {
            setLoggedUser(true);
        }
    }, []);
    return (
        <div>
            {loggedUser && (
                <div>
                    <Layout>
                        <HomeBar />
                    </Layout>
                </div>
            )}

        </div>

    );
}
export default Tender;