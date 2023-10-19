import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import StageCard from "./StageCard";
import { stages } from "../../../../../data/stages";
interface StagesInfoProps {
    tenderStages?: Array<any>
    currentStage?: number;
    stagesLoading: boolean;
}
const StagesInfo = ({ tenderStages, currentStage, stagesLoading }: StagesInfoProps) => {

    const stagesTemp = [
        { name: 0, toDate: 1634644800000 },
        { name: 1, toDate: 1634644800000 },
        { name: 2, toDate: 1634644800000 },
        { name: 3, toDate: 1634644800000 },
        { name: 4, toDate: 1634644800000 },
        { name: 5, toDate: 1634644800000 },
        { name: 6, toDate: 1634644800000 },
        { name: 7, toDate: 1634644800000 },
        { name: 8, toDate: 1634644800000 },
        { name: 9, toDate: 1634644800000 },
        { name: 10, toDate: 1634644800000 },
        { name: 11, toDate: 1634644800000 },
        { name: 12, toDate: 1634644800000 }]
    const [selectedStage, setSelectedStage] = useState<{ name: number, toDate: number }>(stagesTemp[stagesTemp.length - 1]);

    const onClickHandle = (stage: any) => {
        setSelectedStage(stage);
    }

    return (
        <Accordion activeIndex={stagesLoading ? -1 : 0}>
            <AccordionTab header="Ver Etapas" >
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {stagesTemp.map((stage, index) => (
                            <Button key={index} id={`${stage.name}`} name={stages.tag[stage.name]} tooltip={stages.tag[stage.name]} tooltipOptions={{ position: "top", style: { fontSize: '10px', padding: '4px 8px' } }} className="buttonStage p-button-rounded p-button-text p-button-raised" style={{ color: selectedStage.name == stage.name ? 'white' : '#545454', backgroundColor: selectedStage.name == stage.name ? '#6366F1' : 'white' }} label={index.toString()} onClick={() => { onClickHandle(stage) }} />
                        ))}
                    </div>
                    {selectedStage && <StageCard stage={selectedStage} />}
                </div>
            </AccordionTab>
        </Accordion>


    );


}
export default StagesInfo;