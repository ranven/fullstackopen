export const ContactForm = ({
  addContact,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <>
    <form onSubmit={addContact}>
      <div>
        Name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        Number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">Add person</button>
      </div>
    </form>
  </>
);
