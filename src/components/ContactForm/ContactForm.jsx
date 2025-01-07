import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';


const ContactSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  number: Yup.string()
    .matches(
      /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      'Phone number must be in the format xxx-xx-xx'
    )
    .required('Phone number is required'),
});


const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
 
  const nameFieldId = useId();
  const numberFieldId = useId();


  const dispatch = useDispatch();

  
  const handleSubmit = (values, actions) => {
    
    const newContact = { ...values, id: nanoid() };
    dispatch(addContact(newContact)); 
    actions.setSubmitting(false);
    actions.resetForm();
  };

  
  const handleNameChange = (e, setFieldValue) => {
    let nameValue = e.target.value;
   
    if (nameValue && nameValue.charAt(0) !== nameValue.charAt(0).toUpperCase()) {
      nameValue = nameValue.charAt(0).toUpperCase() + nameValue.slice(1);
    }
    setFieldValue('name', nameValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.formContact}>
       
          <label className={styles.formLabel} htmlFor={nameFieldId}>
            Name
          </label>
          <div className={styles.formInputWrapper}>
            <Field
              className={styles.formInput}
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Enter name"
              onChange={(e) => handleNameChange(e, setFieldValue)} 
            />
            <ErrorMessage
              className={styles.formErrorMessage}
              name="name"
              component="div"
            />
          </div>

          <label className={styles.formLabel} htmlFor={numberFieldId}>
            Phone Number
          </label>
          <div className={styles.formInputWrapper}>
            <Field
              className={styles.formInput}
              type="tel"
              inputMode="tel"
              name="number"
              id={numberFieldId}
              placeholder="Enter phone number"
            />
            <ErrorMessage
              className={styles.formErrorMessage}
              name="number"
              component="div"
            />
          </div>

          <button
            className={styles.formButton}
            type="submit"
            disabled={isSubmitting}
          >
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;