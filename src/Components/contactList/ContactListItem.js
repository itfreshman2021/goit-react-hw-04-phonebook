import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';

const ContactListItem = ({ id, name, number, onDeleteContact }) => (
  <li className={s.ContactListItemli}>
    <p className={s.ContactListItemP}>
      {name}:<span className={s.ContactListItemSpan}>{number}</span>
    </p>
    <button type="button" className={s.ContactListItemButton} onClick={() => onDeleteContact(id)}>
      Delete
    </button>
  </li>
);

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactListItem;
