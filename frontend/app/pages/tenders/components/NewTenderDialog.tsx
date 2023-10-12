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

    return (
        <div>
            <Dialog className='dialogForm-resp' header="Nueva Licitación" visible={showDialog} onHide={() => onHide()} >
                <div>
                    {children}
                </div>
            </Dialog>
        </div>
    )
}

export default NewTenderDialog;