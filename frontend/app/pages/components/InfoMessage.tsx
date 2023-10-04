
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

interface InfoMessageProps {
    message: string | undefined;
    type: "success" | "info" | "warn" | "error" | undefined,
    setType: React.Dispatch<React.SetStateAction<"success" | "info" | "warn" | "error" | undefined>>,
    setMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}
const InfoMessage: React.FC<InfoMessageProps> = ({ type, message, setType, setMessage }) => {
    const msgs = useRef<Toast | null>(null);
    const showBottomRight = () => {
        msgs.current?.show({ severity: type, summary: 'Success Message', detail: message, life: 10000 });
        /* setTimeout(() => {
             setType(undefined);
             setMessage(undefined);
         }, 10000);*/
    }

    return (
        <div>
            <Toast ref={msgs} position="bottom-center" />
            <div className="card toast-demo">
                <>{showBottomRight()}</>
            </div>
        </div>
    );
};

export default InfoMessage;
