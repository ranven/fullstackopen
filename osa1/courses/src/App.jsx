const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10 },
      { part: "Using props to pass data", exercises: 7 },
      { part: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header name={course.name}></Header>
      <Content courses={course.parts}></Content>
      <Footer exercises={course.parts}></Footer>
    </div>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part
        part={props.courses[0].part}
        exercises={props.courses[0].exercises}
      ></Part>
      <Part
        part={props.courses[1].part}
        exercises={props.courses[1].exercises}
      ></Part>
      <Part
        part={props.courses[2].part}
        exercises={props.courses[2].exercises}
      ></Part>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part}
      {props.exercises}
    </p>
  );
};

const Footer = (props) => {
  let sum = 0;
  console.log(props);
  for (let i = 0; i < props.exercises.length; i++) {
    sum += props.exercises[i].exercises;
  }
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

export default App;
