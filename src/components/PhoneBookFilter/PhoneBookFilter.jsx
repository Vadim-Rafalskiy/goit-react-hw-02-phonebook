import styles from '../App.module.css';

const PhoneBookFilter = ({ handlChange }) => {
  return (
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
  );
};

export default PhoneBookFilter;
