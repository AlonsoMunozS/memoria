import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { ReactNode } from 'react';
interface dialogProps {
    showDialog: boolean;
    setShowDialog: (bool: boolean) => void;
    children: ReactNode;
}
const NewTenderDialog: React.FC<dialogProps> = ({ showDialog, setShowDialog, children }) => {

    const onHide = () => {
        setShowDialog(false);
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button label="Guardar" icon="pi pi-check" onClick={() => onHide()} autoFocus />
            </div>
        );
    }

    return (
        <div>
            <Dialog header="Nueva Licitación" visible={showDialog} onHide={() => onHide()} style={{ width: '50vw' }} footer={renderFooter()}>
                <div>
                    {children}
                </div>
            </Dialog>
        </div>
    )
}

export default NewTenderDialog;