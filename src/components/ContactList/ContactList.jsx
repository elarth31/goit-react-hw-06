import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
import { deleteContact } from '../../redux/contactsSlice';


const ContactList = () => {

  const contacts = useSelector(selectContacts);
  const valueOfFilter = useSelector(selectNameFilter);


  const dispatch = useDispatch();

    
  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

 
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().startsWith(valueOfFilter.toLowerCase())
  );

    
  if (filteredContacts.length === 0) {
    return <p className={styles.noContacts}>No contacts available</p>;
  }

  return (
    <ul className={styles.contactList}>
      {filteredContacts.map(({ id, number, name }) => (
        <Contact
          key={id}
          id={id}
          number={number}
          name={name}
          onDelete={() => handleDelete(id)} 
        />
      ))}
    </ul>
  );
};

export default ContactList;
