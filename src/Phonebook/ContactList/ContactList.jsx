import React from 'react';
import PropTypes from 'prop-types';
import style from './ContactList.module.css';

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id} className={style.contactListItem}>
          <button
            className={style.btnDeleteContact}
            type="button"
            onClick={() => onDelete(contact.name)}
          >
            delete
          </button>
          {contact.name}:{' '}
          <span className={style.numberPhone}>{contact.number}</span>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};
