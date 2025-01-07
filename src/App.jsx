import './App.css';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Phone book</h1>
      </header>
      <main>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </main>
    </div>
  );
}

export default App;