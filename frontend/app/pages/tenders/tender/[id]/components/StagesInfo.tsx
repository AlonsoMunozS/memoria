import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import StageCard from "./StageCard";
import { stages } from "../../../../../data/stages";
interface StagesInfoProps {
    tenderStages: Array<any>
    currentStage?: number;
    stagesLoading: boolean;
}
const StagesInfo = ({ tenderStages, currentStage, stagesLoading }: StagesInfoProps) => {
    const [selectedStage, setSelectedStage] = useState<{ name?: number, toDate?: number }>();
    const onClickHandle = (stage: any) => {
        setSelectedStage(stage);
    }
    const viewStagesHeader = () => {
        return (
            <div style={{ display: 'flex', gap: "1rem" }}>
                <div >
                    Ver Etapas
                </div>
                {stagesLoading && <div >
                    <i className="pi pi-spinner pi-spin"></i>
                </div>}
            </div>
        )
    }
    useEffect(() => {
        if (!stagesLoading) {
            setSelectedStage(tenderStages[tenderStages.length - 1])
        }
    }
        , [stagesLoading])

    return (
        <Accordion activeIndex={stagesLoading ? 0 : -1}>
            <AccordionTab header={viewStagesHeader()} >
                {!stagesLoading && <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center", }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", position: "relative" }}>
                        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, borderBottom: "1px solid #d8d6d6" }}></div>
                        {tenderStages && tenderStages.map((stage, index) => (
                            <Button key={index} id={`${stage.name}`} name={stages.tag[stage.name]} tooltip={stages.tag[stage.name]} tooltipOptions={{ position: "top", style: { fontSize: '10px', padding: '4px 8px' } }} className="buttonStage p-button-rounded p-button-text p-button-raised" style={{ color: selectedStage?.name == stage.name ? 'white' : '#545454', backgroundColor: selectedStage?.name == stage.name ? '#6366F1' : 'white' }} label={(index + 1).toString()} onClick={() => { onClickHandle(stage) }} />
                        ))}
                    </div>
                    {selectedStage && <StageCard stage={selectedStage} currentStage={currentStage} />}
                </div>}
            </AccordionTab>
        </Accordion>


    );


}
export default StagesInfo;




