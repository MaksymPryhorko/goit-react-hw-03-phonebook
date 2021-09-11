import React from 'react';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';
import style from './Phonebook.module.css';

export default class Phonebook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContatcs = JSON.parse(contacts);
    if (parsedContatcs) {
      this.setState({ contacts: parsedContatcs });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = name => {
    const { contacts } = this.state;
    const newContacts = contacts.filter(contact => contact.name !== name);
    this.setState({ contacts: newContacts });
  };

  checkedDuplicate = newNameContact => {
    const { contacts } = this.state;
    const duplicate = contacts.find(
      contact => contact.name.toLowerCase() === newNameContact.toLowerCase(),
    );

    return duplicate;
  };

  formSubmitHandler = data => {
    if (this.checkedDuplicate(data.name) !== undefined) {
      alert(`${data.name} is alreade in contacts.`);
      return;
    }

    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, data],
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <section className={style.mainSection}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />

        <div className={style.containerContacts}>
          <h2>Contacts:</h2>
          <Filter filter={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        </div>
      </section>
    );
  }
}
