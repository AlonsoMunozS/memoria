
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useRef, useEffect } from 'react';
interface InfoMessageProps {
    message: string | undefined;
    type: "success" | "info" | "warn" | "error" | undefined,
    showToast: boolean
}
const InfoMessage: React.FC<InfoMessageProps> = ({ type, message, showToast }) => {
    const summary = type == "success" ? "Exitoso" : type == "error" ? "Erróneo" : type == "warn" ? "Permiso Denegado" : undefined
    const msgs = useRef<Toast | null>(null);
    useEffect(() => {
        if (showToast == true) {
            msgs.current?.show({ severity: type, summary: summary, detail: message, life: 3000 });
        }
    }, [showToast]);

    return (
        showToast &&
        <div>
            <Toast ref={msgs} position="bottom-center" />
        </div>
    )
}
export default InfoMessage;
