//components
import Header from "./components/Header";
import Total from "./components/Total";
import Content from "./components/Content";

import { CoursePart } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];
  
  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total total={courseParts[0].exerciseCount + courseParts[1].exerciseCount + courseParts[2].exerciseCount + courseParts[3].exerciseCount + courseParts[4].exerciseCount}/>
    </div>
  );
};

export default App;