import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addGood} name="good"></Button>
      <Button handleClick={addNeutral} name="neutral"></Button>
      <Button handleClick={addBad} name="bad"></Button>
      <Statistics {...{ good, neutral, bad }}></Statistics>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;

  return (
    <>
      <h1>statistics</h1>
      {sum > 0 ? (
        <>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={sum} />
          <StatisticsLine
            text="average"
            value={(good * 1 + neutral * 0 + bad * -1) / sum}
          />
          <StatisticsLine
            text="positive"
            value={(good / sum) * 100}
            sign={" %"}
          />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

const StatisticsLine = ({ text, value, sign }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {sign}
      </td>
    </tr>
  );
};

export default App;
