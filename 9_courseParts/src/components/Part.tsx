import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong><br></br>
                    <em>{part.description}</em><br></br>
                    <p></p>
                </div> 
            )
        case "groupProject":
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong><br></br>
                    <>project exercises {part.groupProjectCount}</><br></br>
                    <p></p>
                </div> 
            )
        case "special":
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong><br></br>
                    <em>{part.description}</em><br></br>
                    <>required skills{part.requirements?.map(x => <li key={x}> {x}</li>)}</>
                    <p></p>
                </div> 
            )
        case "submission":
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong><br></br>
                    <em>{part.description}</em><br></br>
                    <>{part.exerciseSubmissionLink}</><br></br>
                    <p></p>
                </div> 
            )
        default:
            return assertNever(part);
    }};

export default Part;