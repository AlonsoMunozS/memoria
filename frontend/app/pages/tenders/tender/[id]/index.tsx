import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import HomeBar from "../../../components/HomeBar";
import GeneralInfo from "./components/GeneralInfo";
import { Card } from "primereact/card";
import StagesInfo from "./components/StagesInfo";
import { getTender } from "../../../../services/TenderService";
import { Tender } from "../models/Tender";
import { getTenderStages } from "../../../../services/TenderStageService";
import { timeTokenVerify } from "../../../../services/LoginService";
const Tender = () => {
    const [loggedUser, setLoggedUser] = useState<boolean>(false);
    const [tender, setTender] = useState<Tender>();
    const [tenderStages, setTenderStages] = useState<any>([]);
    const router = useRouter();
    const [tenderLoading, setTenderLoading] = useState<boolean>(true);
    const [stagesLoading, setStagesLoading] = useState<boolean>(true);
    const [currentStage, setCurrentStage] = useState<number>(0);

    const getStages = async (tenderId: number) => {
        setStagesLoading(true);
        const responseTenders = await getTenderStages(tenderId);
        setTenderStages(responseTenders);
        setStagesLoading(false);
    }

    const getTenderInfo = async (id: number) => {
        setTenderLoading(true);
        const responseTender = await getTender(id);
        setTender(responseTender);
        setCurrentStage(responseTender.currentStage);
        setTenderLoading(false);
        getStages(responseTender.id)
    }

    useEffect(() => {
        if (localStorage.getItem('authToken') == null) {
            router.push('/login');
        }
        const expirationTime = localStorage.getItem('expirationTime');
        if (!expirationTime) return;
        if (timeTokenVerify(parseInt(expirationTime))) {
            localStorage.clear();
            window.location.href = '/login';
        }
        else {
            if (typeof (router.query.id) == "string") {
                getTenderInfo(parseInt(router.query.id));
            }
            setLoggedUser(true);
        }
    }, [router.query.id, currentStage]);


    return (
        <div>
            {loggedUser && (
                <div>
                    <Layout>
                        <HomeBar />
                    </Layout>
                    <Card title={`Licitación N°: ${router.query.id ? router.query.id : ''}`}>
                        <GeneralInfo tenderLoading={tenderLoading} tender={tender} />
                        <StagesInfo stagesLoading={stagesLoading} tenderStages={tenderStages} currentStage={currentStage} setCurrentStage={setCurrentStage} />
                    </Card>
                </div>
            )}

        </div>

    );
}
export default Tender;