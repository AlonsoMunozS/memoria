import { FileUpload } from "primereact/fileupload";
import { stages } from "../../../../../data/stages";
import { Tag } from "primereact/tag";
import { getStageComments, uploadFile } from "../../../../../services/TenderStageService";
import { useState } from "react";
import { Button } from "primereact/button";

type StageComment = {
    stageId: number
    createdBy: string
    createdAt: number
    post: string
}
interface StageCardProps {
    stage?: any
}
const StageCard = ({ stage }: StageCardProps) => {
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
    const uploadFileHandler = async (file: File) => {
        await uploadFile(stage.tenderId, stage.name, file)
        setFileUploading(false);

    }
    const onUploadFile = (item: { files: Array<File> }) => {
        setFileUploading(true);
        uploadFileHandler(item.files[0])

    };
    const getStageCommentsHandler = async () => {
        const comments = await getStageComments(stage.id)
        setStageComments(comments)
        setStageCommentsLoading(false);
    }

    return (
        <div className="stageCard">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Tag id="stage.name" style={{ marginLeft: '10px' }} className={`tender-status stage${stage.name}`}>{stages.tag[stage.name]}</Tag>

                <div style={{ textAlign: 'right', marginRight: '10px' }}>
                    <span><strong>Plazo máximo: </strong>{converDate(stage.toDate)}</span>
                </div>

            </div>
            <div >
                <FileUpload customUpload={true} chooseOptions={{ label: "Subir archivo" }} uploadHandler={onUploadFile} mode="basic" maxFileSize={1250000} />
            </div>
            <div >
                <Button label="hola" onClick={getStageCommentsHandler} />
                {stageComments && <div>{stageComments[0].post}, </div>}
            </div>
        </div>
    );


}
export default StageCard;