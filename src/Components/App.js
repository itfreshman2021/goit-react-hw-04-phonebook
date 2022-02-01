import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './App.module.css';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

export default function App() {
  const [contacts, SetContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, SetFilter] = useState('');

  const changeFilter = event => {
    const { value } = event.target;
    SetFilter(value);
  };

  const addContact = dataContact => {
    const DoubleContact = contacts.find(
      contact => contact.name.toLocaleLowerCase() === dataContact.name.toLocaleLowerCase(),
    );

    if (DoubleContact !== undefined) {
      alert(`${DoubleContact.name} is already in contacts.`);
      return;
    }
    const contactNew = {
      id: uuidv4(),
      name: dataContact.name,
      number: dataContact.number,
    };
    SetContacts(() => [...contacts, contactNew]);
  };

  const deleteContact = idContact => {
    SetContacts(() => contacts.filter(contact => contact.id !== idContact));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <div className={s.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList visibleContacts={getVisibleContacts()} onDeleteContact={deleteContact} />
      </div>
    </>
  );
}
