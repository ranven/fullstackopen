const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Footer parts={course.parts}></Footer>
    </>
  );
};

const Header = (props) => {
  return (
    <>
      <h2>{props.name}</h2>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <Part
            part={part.name}
            exercises={part.exercises}
            key={part.id}
          ></Part>
        );
      })}
    </>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Footer = ({ parts }) => {
  let sum = parts.reduce((sum, ord) => sum + ord.exercises, 0);
  return (
    <>
      <b>total of exercises {sum}</b>
    </>
  );
};

export default Course;
