import { FileUpload } from "primereact/fileupload";
import { createStageComments, getStageComments, getStageFiles, uploadFile } from "../../../../../services/TenderStageService";
import { useRef, useState, useEffect } from "react";
import { stages } from "../../../../../data/stages";
import { Tag } from "primereact/tag";
import { ScrollPanel } from "primereact/scrollpanel";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { forEachLeadingCommentRange } from "typescript";
import { Toast } from "primereact/toast";
import { OrderList } from 'primereact/orderlist';
import { Menu } from "primereact/menu";
import { ProgressSpinner } from "primereact/progressspinner";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";

type StageComment = {
    stageId: number
    createdBy: string
    createdAt: number
    post: string
}
interface StageCardProps {
    stage?: any,
    currentStage?: number
}
const StageCard = ({ stage, currentStage }: StageCardProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const [fileSelected, setFileSelected] = useState<File>();
    const msgs = useRef<Toast | null>(null);
    const converDate = (date: number) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        const formatDate = `${day}/${month}/${year}`;
        return formatDate;
    }
    const [fileUploading, setFileUploading] = useState<boolean>(false);
    const [stageComments, setStageComments] = useState<Array<StageComment>>();
    const [stageCommentsLoading, setStageCommentsLoading] = useState<boolean>(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<Array<{ fileName: string, downloadUrl: string }>>([]);
    const [filesLoading, setFilesLoading] = useState<boolean>(true);

    const getFiles = async () => {
        setFilesLoading(true);
        const filesName = await getStageFiles(stage.tenderId, stage.name);
        setFiles(filesName)
        console.log(filesName)
        setFilesLoading(false);
    }

    const uploadFileHandler = async () => {
        if (!fileSelected) return;
        setFileUploading(true);
        await uploadFile(stage.tenderId, stage.name, fileSelected)
        setFileUploading(false);
        setFileSelected(undefined);
        msgs.current?.show({ severity: "success", summary: "Exitoso", detail: "Archivo subido correctamente", life: 3000 });
        getFiles()

    }
    const createCommentHandler = async (post: string) => {
        setStageCommentsLoading(true);
        await createStageComments({ stageId: stage.id, post })
        setStageCommentsLoading(false);
        msgs.current?.show({ severity: "success", summary: "Exitoso", detail: "Archivo subido correctamente", life: 3000 });
        getStageCommentsHandler()

    }
    const getStageCommentsHandler = async () => {
        const comments = await getStageComments(stage.id)
        setStageComments(comments)
        setStageCommentsLoading(false);
    }

    const onClickAddNextStage = () => {
        setShowDialog(true);
    }

    const onHideDialog = () => {
        setShowDialog(false);
    }
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setFileSelected(file)
        }
    };
    const handleCancelFile = () => {
        setFileSelected(undefined)
    };
    let items = files.map((file) => ({
        label: file.fileName,
        icon: 'pi pi-file', // Puedes cambiar el icono según tus necesidades
        command: () => {
            window.location.href = file.downloadUrl
        }
    }))

    useEffect(() => {
        setFilesLoading(true)
        setStageCommentsLoading(true)
        getStageCommentsHandler();
        getFiles();
    }, [stage])
    return (
        <div style={{ width: "100%" }}>
            <Toast ref={msgs} position="bottom-center" />
            <Dialog className='dialogForm-resp' header="Nueva Etapa" visible={showDialog} onHide={() => onHideDialog()} >
                <div>
                    <Tag id="stage.name" style={{ textAlign: 'right', fontSize: '16px' }} className={`tender-status stage${stage.name + 1}`}>{stages.tag[stage.name + 1]}</Tag>
                </div>
            </Dialog>
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
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // Oculta el input de tipo file
                        />
                        <Button className="p-button-rounded p-button-sm p-button-outlined" label={"Subir archivo"} icon={"pi pi-upload"} onClick={handleButtonClick} />
                        {fileSelected && <p style={{ fontSize: "14px", marginLeft: "10px" }}>{fileSelected.name}</p>}
                        {fileSelected && <Button className="p-button-text" icon={!fileUploading ? "pi pi-upload" : "pi pi-spinner pi-spin"} onClick={uploadFileHandler} />}
                        {fileSelected && <Button className="p-button-text" icon={"pi pi-times"} onClick={handleCancelFile} />}

                    </div>
                    {!filesLoading && <Menu model={items} style={{ width: '100%', maxHeight: '150px', overflowY: 'auto' }} />}
                    <div style={{ display: "flex", justifyContent: "center", width: '100%', maxHeight: '150px', border: '1px solid var(--surface-d)', borderRadius: '3px' }}>
                        {filesLoading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                        <span style={{ marginRight: '10px' }}><strong>Comentarios: </strong></span>
                        <Button icon="pi pi-plus" className="p-button-rounded p-button-sm p-button-outlined" disabled={!(currentStage == stage.name)}></Button>
                    </div>
                    <div style={{ width: '100%', maxHeight: '150px', overflowY: 'auto', border: '1px solid var(--surface-d)', borderRadius: '3px' }}>
                        {stageComments && stageComments.map(item => (
                            <div className="p-col-12 p-md-6 p-lg-4" key={item.stageId}>
                                <Card >
                                    <div><strong>Creado por:</strong> {item.createdBy}</div>
                                    <div><strong>Fecha de creacion:</strong> {item.createdAt}</div>
                                    <div><strong>Comentario:</strong> {item.post}</div>
                                </Card>

                            </div>

                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {currentStage == stage.name ? <Button label="Cierre Anticipado" icon="pi pi-times" iconPos="right" className="p-button-danger" /> : null}
                        {(currentStage == stage.name && stage.name != stages.tag[stage.length - 1]) ? <Button label="Agregar Siguiente Etapa" icon="pi pi-chevron-right" iconPos="right" onClick={onClickAddNextStage} /> : <span style={{ marginRight: '10px', marginLeft: 'auto' }}><strong>ETAPA FINALIZADA</strong></span>}
                    </div>
                </div>

            </div >

        </div >
    );


}
export default StageCard;