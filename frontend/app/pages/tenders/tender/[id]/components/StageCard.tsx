import { getStageComments, getStageFiles, uploadFile } from "../../../../../services/TenderStageService";
import { useRef, useState, useEffect } from "react";
import { stages } from "../../../../../data/stages";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Menu } from "primereact/menu";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import AddNextStageDialog from "./AddNextStageDialog";
import AddComment from "./AddComment";
import { timeTokenVerify } from "../../../../../services/LoginService";

type StageComment = {
    stageId: number
    createdBy: string
    createdAt: number
    post: string
}
interface StageCardProps {
    stage?: any,
    currentStage?: number,
    setCurrentStage: React.Dispatch<React.SetStateAction<number>>
}
const StageCard = ({ stage, currentStage, setCurrentStage }: StageCardProps) => {
    const [showDialogAddNextStage, setShowDialogAddNextStage] = useState(false);
    const [showDialogAddComment, setShowDialogAddComment] = useState(false);
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

    const getStageCommentsHandler = async () => {
        const comments = await getStageComments(stage.id)
        setStageComments(comments)
        setStageCommentsLoading(false);
    }

    const onClickAddNextStage = () => {
        const expirationTime = localStorage.getItem('expirationTime');
        if (!expirationTime) return;
        if (timeTokenVerify(parseInt(expirationTime))) {
            localStorage.clear();
            window.location.href = '/login';
        }
        setShowDialogAddNextStage(true);
    }

    const onClickAddComment = () => {
        const expirationTime = localStorage.getItem('expirationTime');
        if (!expirationTime) return;
        if (timeTokenVerify(parseInt(expirationTime))) {
            localStorage.clear();
            window.location.href = '/login';
        }
        setShowDialogAddComment(true);
    }

    const handleButtonClick = () => {
        const expirationTime = localStorage.getItem('expirationTime');
        if (!expirationTime) return;
        if (timeTokenVerify(parseInt(expirationTime))) {
            localStorage.clear();
            window.location.href = '/login';
        }
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
        const expirationTime = localStorage.getItem('expirationTime');
        if (!expirationTime) return;
        if (timeTokenVerify(parseInt(expirationTime))) {
            localStorage.clear();
            window.location.href = '/login';
        }
        setFilesLoading(true)
        setStageCommentsLoading(true)
        getStageCommentsHandler();
        getFiles();
    }, [stage])
    return (
        <div style={{ width: "100%" }}>
            <AddComment showDialog={showDialogAddComment} setShowDialog={setShowDialogAddComment} stage={stage} setStageCommentsLoading={setStageCommentsLoading} setStageComments={setStageComments} />
            <AddNextStageDialog showDialog={showDialogAddNextStage} setShowDialog={setShowDialogAddNextStage} stage={stage} setCurrentStage={setCurrentStage} />
            <Toast ref={msgs} position="bottom-center" />
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
                        <Button className="p-button-rounded p-button-sm p-button-outlined" label={"Subir archivo"} icon={"pi pi-upload"} onClick={handleButtonClick} disabled={!(currentStage == stage.name)} />
                        {fileSelected && <p style={{ fontSize: "14px", marginLeft: "10px" }}>{fileSelected.name}</p>}
                        {fileSelected && <Button className="p-button-text" icon={!fileUploading ? "pi pi-upload" : "pi pi-spinner pi-spin"} onClick={uploadFileHandler} />}
                        {fileSelected && <Button className="p-button-text" icon={"pi pi-times"} onClick={handleCancelFile} />}

                    </div>
                    <div style={{ marginBottom: '5vh' }}>
                        {!filesLoading && files.length != 0 && <div>
                            <Menu model={items} style={{ width: '100%', maxHeight: '150px', overflowY: 'auto' }} />
                        </div>}
                        <div style={{ display: "flex", justifyContent: "flex-start", width: '100%', maxHeight: '150px', border: '1px solid var(--surface-d)', borderRadius: '3px' }}>
                            {filesLoading ? <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> : files.length == 0 && <span>No hay archivos</span>}

                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ marginRight: '10px' }}><strong>Comentarios: </strong></span>
                        <Button icon="pi pi-plus" className="p-button-rounded p-button-sm p-button-outlined" disabled={!(currentStage == stage.name)} onClick={onClickAddComment}></Button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: '100%', border: '1px solid var(--surface-d)', borderRadius: '3px', marginBottom: '3vh' }}>
                        <div style={{ width: '100%', height: '200px', overflowY: 'auto' }}>
                            {stageComments && !stageCommentsLoading && stageComments.map(item => (
                                <div key={item.stageId} style={{ marginBottom: '1rem' }}>
                                    <Card >
                                        <div><strong>Creado por:</strong> {item.createdBy}</div>
                                        <div><strong>Fecha de creacion:</strong> {converDate(item.createdAt)}</div>
                                        <div><strong>Comentario:</strong> {item.post}</div>
                                    </Card>
                                </div>

                            ))}
                        </div>
                        {stageCommentsLoading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
                        {stageComments?.length == 0 && !stageCommentsLoading && <span>No hay comentarios</span>}

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {currentStage == stage.name && stages.tag[stage.name] != 'CONSULTAS' && stages.tag[stage.name] != 'RESPUESTAS' ? <Button label="Cierre Anticipado" icon="pi pi-times" iconPos="right" className="p-button-danger" /> : null}
                        {(currentStage == stage.name && stage.name != (stages.tag.length - 2)) ? <Button label="Agregar Siguiente Etapa" icon="pi pi-chevron-right" iconPos="right" onClick={onClickAddNextStage} style={{ marginLeft: 'auto' }} /> : stage.name != (stages.tag.length - 2) ? <span style={{ marginLeft: 'auto' }}><strong>ETAPA FINALIZADA</strong></span> : <Button label="Crear Contrato" icon="pi pi-chevron-right" iconPos="right" style={{ marginLeft: 'auto' }} className="p-button-success" />}
                    </div>
                </div>

            </div >

        </div >
    );


}
export default StageCard;