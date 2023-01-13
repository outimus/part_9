import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Gender } from '../types';

const GenderIcon = ({gender}:{gender: Gender}) => {
    if (gender === 'male') {
        return (
            <div><MaleIcon/></div>
        );
    }
    if (gender === 'female') {
        return (
            <div><FemaleIcon/></div>
        );
    } else {
        return (
            <div></div>
        );
    }
};

export default GenderIcon;