import { Tag } from 'primereact/tag';
import React, { ReactNode } from 'react';
import { stages } from '../../../data/stages';
import { Button } from 'primereact/button';
interface tenderCardProps {
    name: string;
    mercadoPublicoId: string;
    currentStage: number;
}
const TenderCard: React.FC<tenderCardProps> = ({ name, mercadoPublicoId, currentStage }) => {

    return (
        <div className="card2 smallplusbutton-resp">
            <h2 className="card2-title">{name}</h2>
            <p className="card2-description">{mercadoPublicoId}</p>
            <Tag className={`tender-status stage${currentStage}`}>{stages.tag[currentStage]}</Tag>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', margin: '20px', gap: "1rem" }}>
                <Button className="p-button-rounded" icon="pi pi-eye"></Button>
                <Button className="p-button-rounded" icon="pi pi-pencil"></Button>
            </div>
        </div>
    )
}

export default TenderCard;