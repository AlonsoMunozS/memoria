import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import HomeBar from "../../../components/HomeBar";
import GeneralInfo from "./components/GeneralInfo";
import { Card } from "primereact/card";
import StagesInfo from "./components/StagesInfo";
const Tender = () => {
    const [loggedUser, setLoggedUser] = useState(false);
    const router = useRouter();
    const { id } = router.query;

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
                    <Card title={`Licitación N°: ${id}`}>
                        <GeneralInfo />
                        <StagesInfo />
                    </Card>

                </div>
            )}

        </div>

    );
}
export default Tender;