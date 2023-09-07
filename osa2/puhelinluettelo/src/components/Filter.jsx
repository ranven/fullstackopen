import { Person } from "./Person";

export const Filter = ({ filter, onFilterChange }) => (
  <>
    <p>Filter by: </p>
    <input value={filter} onChange={onFilterChange} />
  </>
);

export const FilteredContacts = ({ filter, persons }) => (
  <>
    {persons
      .filter(
        (person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()) ||
          person.number.includes(filter)
      )
      .map((person) => {
        return (
          <Person
            name={person.name}
            number={person.number}
            id={person.name}
            key={person.name}
          ></Person>
        );
      })}
  </>
);
