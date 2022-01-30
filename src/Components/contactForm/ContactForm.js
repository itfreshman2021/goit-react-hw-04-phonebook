import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [name, SetName] = useState('');
  const [number, SetNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        SetName(value);
        break;
      case 'number':
        SetNumber(value);
        break;

      default:
        return;
    }
  };

  const HandleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    SetName('');
    SetNumber('');
  };

  return (
    <form onSubmit={HandleSubmit} className={s.ContactForm}>
      <label className={s.ContactFormLabel}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          value={name}
          onChange={handleChange}
          required
          className={s.ContactFormInput}
        />
      </label>
      <label className={s.ContactFormLabel}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          value={number}
          onChange={handleChange}
          required
          className={s.ContactFormInput}
        />
      </label>

      <button type="submit" className={s.ContactFormButton}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };
