import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import StageCard from "./StageCard";
interface StagesInfoProps {
    tenderStages?: Array<any>
    currentStage?: number;
    stagesLoading: boolean;
}
const StagesInfo = ({ tenderStages, currentStage, stagesLoading }: StagesInfoProps) => {

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const stagesTemp = [{ name: 0 }, { name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }, { name: 7 }, { name: 8 }, { name: 9 }, { name: 10 }, { name: 11 }, { name: 12 }]



    useEffect(() => {
        if (currentStage)
            setActiveIndex(currentStage)
    }, [currentStage]);
    return (
        <Accordion activeIndex={stagesLoading ? -1 : 0}>
            <AccordionTab header="Ver Etapas" >
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {stagesTemp.map((stage, index) => (
                            <Button className="p-button-rounded p-button-text p-button-raised" style={{ color: "#545454" }} label={index.toString()} />
                        ))}
                    </div>
                    <div>
                        <StageCard /></div>
                </div>
            </AccordionTab>
        </Accordion>


    );


}
export default StagesInfo;