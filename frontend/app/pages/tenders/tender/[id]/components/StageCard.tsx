import { Button } from "primereact/button";
import { stages } from "../../../../../data/stages";
import { Tag } from "primereact/tag";
import { ScrollPanel } from "primereact/scrollpanel";
import { useState, useEffect } from 'react';

interface StageCardProps {
    stage?: any,
    currentStage?: number
}
const StageCard = ({ stage, currentStage }: StageCardProps) => {
    const converDate = (date: number) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        const formatDate = `${day}/${month}/${year}`;
        return formatDate;
    }

    return (
        <div className="stageCard">
            <div className='container'>
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span><strong>Fecha de Inicio: </strong>{converDate(stage.createdAt)}</span>
                        <Tag id="stage.name" style={{ textAlign: 'right', fontSize: '16px' }} className={`tender-status stage${stage.name}`}>{stages.tag[stage.name]}</Tag>
                    </div>
                    <span><strong>Fecha de término: </strong>{converDate(stage.toDate)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ marginRight: '10px' }}><strong>Archivos: </strong></span>
                    <Button icon="pi pi-plus" className="p-button-rounded p-button-sm p-button-outlined" disabled={!(currentStage == stage.name)}></Button>
                </div>
                <div className="stageCard">
                    <ScrollPanel style={{ width: '100%', height: '150px' }} className="custombar">
                        <div style={{ padding: '1em', lineHeight: '1.5' }}>
                            The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved
                            son Michael has just come home from the war, but does not intend to become part of his father's business. Through
                            Michael's life the nature of the family business becomes clear. The business of the family is just like the head
                            of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands
                            against the good of the family.
                            The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved
                            son Michael has just come home from the war, but does not intend to become part of his father's business. Through Michael's
                            life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind
                            and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the
                            family.
                        </div>
                    </ScrollPanel>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ marginRight: '10px' }}><strong>Comentarios: </strong></span>
                    <Button icon="pi pi-plus" className="p-button-rounded p-button-sm p-button-outlined" disabled={!(currentStage == stage.name)}></Button>
                </div>
                <div className="stageCard">
                    <ScrollPanel style={{ width: '100%', height: '150px' }} className="custombar">
                        <div style={{ padding: '1em', lineHeight: '1.5' }}>
                            The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved
                            son Michael has just come home from the war, but does not intend to become part of his father's business. Through
                            Michael's life the nature of the family business becomes clear. The business of the family is just like the head
                            of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands
                            against the good of the family.
                            The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved
                            son Michael has just come home from the war, but does not intend to become part of his father's business. Through Michael's
                            life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind
                            and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the
                            family.
                        </div>
                    </ScrollPanel>
                </div>
                <div style={{ textAlign: 'right' }}>
                    {currentStage == stage.name ? <Button label="Siguiente Etapa" icon="pi pi-chevron-right" iconPos="right" /> : <span style={{ marginRight: '10px' }}><strong>ETAPA FINALIZADA</strong></span>}
                </div>
            </div>
        </div>
    );


}
export default StageCard;