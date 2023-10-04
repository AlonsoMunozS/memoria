
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useRef, useEffect } from 'react';
interface InfoMessageProps {
    message: string | undefined;
    type: "success" | "info" | "warn" | "error" | undefined,
    showToast: boolean
}
const InfoMessage: React.FC<InfoMessageProps> = ({ type, message, showToast }) => {
    const msgs = useRef<Toast | null>(null);
    useEffect(() => {
        msgs.current?.show({ severity: type, summary: 'Success Message', detail: message, life: 3000 });
    }, [type]);

    return (
        showToast &&
        <div>
            <Toast ref={msgs} position="bottom-center" />
        </div>
    )



}

export default InfoMessage;
