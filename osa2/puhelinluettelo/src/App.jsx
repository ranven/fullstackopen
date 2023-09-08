import { useEffect, useState } from "react";
import { ContactForm } from "./components/Form";
import { Filter, FilteredContacts } from "./components/Filter";
import contactService from "./services/contacts";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existing = persons.findIndex(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (existing > 0) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        contactService
          .updateContact(persons[existing].id, newPerson)
          .then((updatedContact) => {
            setPersons(
              persons.map((p) =>
                p.id !== persons[existing].id ? p : updatedContact
              )
            );
          });
      }
    } else {
      contactService.createContact(newPerson).then((newContact) => {
        setPersons(persons.concat(newContact));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteContact = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService.deleteContact(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
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
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></ContactForm>
      <h2>Contacts</h2>
      <FilteredContacts
        persons={persons}
        filter={newFilter}
        handleDelete={deleteContact}
      ></FilteredContacts>
    </div>
  );
};

export default App;
