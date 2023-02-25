import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';

import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handlChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addContact = e => {
    e.preventDefault();
    const { name } = this.state;
    if (this.isDuplicate(name)) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      const { name, number, contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      return { contacts: [newContact, ...contacts], name: '', number: '' };
    });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  isDuplicate(name) {
    const normalizeName = name.toLowerCase();
    const { contacts } = this.state;
    const contact = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizeName;
    });
    return Boolean(contact);
  }

  getFilterContacts() {
    const { filter, contacts } = this.state;
    if (!filter.trim()) {
      return contacts;
    }
    const normalizeFilter = filter.toLowerCase();
    const rezult = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizeFilter);
    });
    return rezult;
  }

  render() {
    const { handlChange, addContact, removeContact } = this;
    const { name, number } = this.state;
    const contacts = this.getFilterContacts();

    return (
      // <div>
      //   <h1>Phonebook</h1>
      //   <ContactForm ... />

      //   <h2>Contacts</h2>
      //   <Filter ... />
      //   <ContactList ... />
      // </div>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h1 className={styles.title}>Phonebook</h1>

          <form action="" onSubmit={addContact}>
            <div className={styles.formGroup}>
              <label htmlFor="">Name</label>
              <input
                onChange={handlChange}
                type="text"
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="">Number</label>
              <input
                onChange={handlChange}
                type="tel"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </div>

            <button type="submit">Add contact</button>
          </form>
        </div>

        <div className={styles.block}>
          <h2 className={styles.title}>Contacts</h2>
          <div className={styles.formGroup}>
            <label htmlFor="">Find contacts by name</label>
            <input
              onChange={handlChange}
              type="text"
              name="filter"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
          <ContactList removeContact={removeContact} contacts={contacts} />
        </div>
      </div>
    );
  }
}
