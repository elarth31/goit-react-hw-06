import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectNameFilter } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const value = useSelector(selectNameFilter);


  const handleFilterChange = (e) => {
    let filterValue = e.target.value;
    
    if (filterValue) {
      filterValue = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
    }
    dispatch(setSearchTerm(filterValue)); 
  };

  return (
    <div className={styles.searchContainer}>
      <label className={styles.searchLabel} htmlFor={searchId}>
        Find contacts by name
      </label>
      <input
        onChange={handleFilterChange} 
        className={styles.searchInput}
        id={searchId}
        type="search"
        inputMode="search"
        value={value} 
        placeholder="Search by name..."
        aria-label="Search contacts by name"
      />
    </div>
  );
};

export default SearchBox;