import { stages } from "../../../../../data/stages";
import { Tag } from "primereact/tag";

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

    return (
        <div className="stageCard">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Tag id="stage.name" style={{ marginLeft: '10px' }} className={`tender-status stage${stage.name}`}>{stages.tag[stage.name]}</Tag>

                <div style={{ textAlign: 'right', marginRight: '10px' }}>
                    <span><strong>Plazo máximo: </strong>{converDate(stage.toDate)}</span>
                </div>
            </div>

        </div>
    );


}
export default StageCard;