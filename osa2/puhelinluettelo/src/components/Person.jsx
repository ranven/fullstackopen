export const Person = ({ name, number, id, handleDelete }) => {
  return (
    <li key={id}>
      {name} {number}{" "}
      <button onClick={() => handleDelete(name, id)}>Delete</button>
    </li>
  );
};
