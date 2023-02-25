import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import PhoneBookFilter from './PhoneBookFilter/PhoneBookFilter';
import PhoneBookForm from './PhoneBookForm/PhoneBookForm';
import contacts from './contacts';

import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
    // name: '',
    // number: '',
  };

  // handlChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  handlFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  addContact = ({ name, number }) => {
    // e.preventDefault();
    // const { name } = this.state;
    if (this.isDuplicate(name)) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      // const { name, number, contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
        // name: name,
        // number: number,
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
    const { handlFilter, addContact, removeContact } = this;
    // const { name, number } = this.state;
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
          <PhoneBookForm onSubmit={addContact} />
          {/* <form action="" onSubmit={addContact}>
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
          </form> */}
        </div>

        <div className={styles.block}>
          <h2 className={styles.title}>Contacts</h2>
          {/* <div className={styles.formGroup}>
            <label htmlFor="">Find contacts by name</label>
            <input
              onChange={handlChange}
              type="text"
              name="filter"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div> */}
          <PhoneBookFilter handlChange={handlFilter} />
          <ContactList removeContact={removeContact} contacts={contacts} />
        </div>
      </div>
    );
  }
}
