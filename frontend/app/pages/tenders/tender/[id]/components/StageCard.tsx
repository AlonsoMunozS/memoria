import { Button } from "primereact/button";

interface StageCardProps {
    stage?: Array<any>
}
const StageCard = ({ stage }: StageCardProps) => {

    return (
        <div className="stageCard"><Button label="holahols" /></div>
    );


}
export default StageCard;