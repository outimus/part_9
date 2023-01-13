import Part from "./Part";
import { CoursePart } from "../types";

/*interface CoursePart {
    name: string;
    description?: string;
    exerciseCount: number;
    groupProjectCount?: number;
    type: string;
    exerciseSubmissionLink?: string;
    requirements?: Array<string>;
}*/



const Content = ({ courseParts }: {courseParts: Array<CoursePart> })=> {
    return (
        <div>
            {courseParts.map(part => <Part key={part.name} part={part}/>)}
        </div>
    )}

export default Content;
