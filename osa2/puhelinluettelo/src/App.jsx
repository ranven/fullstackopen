import { useState } from "react";
import { Person } from "./components/Person";
import { ContactForm } from "./components/Form";
import { Filter, FilteredContacts } from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "020202" },
    { name: "Arto Hs", number: "2220202" },
    { name: "RRRR", number: "666" },
    { name: "Alas", number: "033202" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((p) => p.name === newPerson.name)) {
      console.log(newPerson);
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onFilterChange={handleFilterChange}></Filter>
      <h2>Add a contact</h2>
      <ContactForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></ContactForm>
      <h2>Contacts</h2>
      <FilteredContacts persons={persons} filter={newFilter}></FilteredContacts>
    </div>
  );
};

export default App;
