const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  interface HeaderProps {
    courseName: string;
  }

  
  interface ContentProps {
    courseParts: coursePart[]
  }

  interface TotalProps {
    totalExercises: number
  }

  interface coursePart {
    name: string,
    exerciseCount: number
  }
  
  const Header = (props: HeaderProps): JSX.Element => {
    return <h1>{props.courseName}</h1>

  }

  const Content = (props: ContentProps): JSX.Element => {
    return <>
      <p>
        {props.courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </>
  }

  const Total = (props: TotalProps): JSX.Element => {
    return <p>Number of exercises {props.totalExercises}</p>
  }
  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total totalExercises={totalExercises}></Total>
    </div>
  );
};

export default App;