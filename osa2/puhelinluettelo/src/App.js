import React, { useState, useEffect } from "react";

import { getAll, create, update, remove } from "./services/persons";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={(e) => addPerson(e)}>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter, deletePerson }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <div key={person.id}>
        <p>
          {person.name} {person.number}
        </p>
        <button onClick={() => deletePerson(person)}>delete</button>
      </div>
    ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAll();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  const addPerson = async (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const found = persons.find((person) => person.name === newName);
    if (found) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const { data } = await update(found.id, newPerson);
        setPersons(
          persons.map((person) => (person.id !== found.id ? person : data))
        );
        setNewName("");
        setNewNumber("");
      }
    } else {
      const { data } = await create(newPerson);
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = async ({ id, name }) => {
    if (window.confirm(`Delete ${name} ?`)) {
      await remove(id);
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
