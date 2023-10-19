import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import HomeBar from "../../../components/HomeBar";
import GeneralInfo from "./components/GeneralInfo";
import { Card } from "primereact/card";
import StagesInfo from "./components/StagesInfo";
import { getTender } from "../../../../services/TenderService";
import { Tender } from "../models/Tender";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
const Tender = () => {
    const [loggedUser, setLoggedUser] = useState<boolean>(false);
    const [tender, setTender] = useState<Tender>();
    const router = useRouter();
    const [tenderLoading, setTenderLoading] = useState<boolean>(false);
    const [stagesLoading, setStagesLoading] = useState<boolean>(false);


    const getTenderInfo = async (id: number) => {
        const responseTenders = await getTender(id);
        setTender(responseTenders);
        setTenderLoading(false);
    }

    useEffect(() => {
        if (localStorage.getItem('authToken') == null) {
            router.push('/login');
        }
        else {
            if (typeof (router.query.id) == "string") {
                setTenderLoading(true);
                getTenderInfo(parseInt(router.query.id));
            }
            setLoggedUser(true);
        }
    }, [router.query.id]);


    return (
        <div>
            {loggedUser && (
                <div>
                    <Layout>
                        <HomeBar />
                    </Layout>
                    <Card title={`Licitación N°: ${router.query.id ? router.query.id : ''}`}>
                        <GeneralInfo tenderLoading={tenderLoading} tender={tender} />
                        <StagesInfo stagesLoading={stagesLoading} currentStage={tender?.currentStage} />
                    </Card>
                </div>
            )}

        </div>

    );
}
export default Tender;