//Material icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Entry } from "../types";

const assertNever = (value: never): never => {
throw new Error(
`Unhandled discriminated union member: ${JSON.stringify(value)}`
);
};

const rating = (x: number) => {
    if (x === 0) {
        return <div><FavoriteIcon color="secondary"/></div>;
    }
    if (x === 1){
        return <div><FavoriteIcon color="success"/></div>;
    }
    if (x === 2) {
        return <div><FavoriteIcon color="action"/></div>;
    }
    if (x === 3){
        return <div><FavoriteIcon color="disabled"/></div>;
    }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
    
    switch (entry.type) {
        case "Hospital":
            return (
                <div>
                    <p> {entry.date} <LocalHospitalIcon/></p>
                    <em> {entry.description}</em><br></br>
                    <> diagnose by {entry.specialist}</>
                </div>
            );  
        case "OccupationalHealthcare":
            return (
                <div>
                    <p> {entry.date} <HealingIcon/> {entry.employerName}</p>
                    <em> {entry.description}</em><br></br>
                    <> sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</><br></br>
                    <> diagnose by {entry.specialist}</>
                </div>
            );
        case "HealthCheck":
            return (
                <div>
                    <p> {entry.date} <MonitorHeartIcon/></p>
                    <em> {entry.description}</em><br></br>
                    <>{rating(entry.healthCheckRating)}</>
                    <> diagnose by {entry.specialist}</>
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;