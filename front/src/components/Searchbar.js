import React, { useState } from 'react';
import './searchbar.css';
import { EuiInputPopover, EuiFieldText } from '@elastic/eui';

import { Link } from 'react-router-dom';

function Searchbar({ placeholder, data }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggleIsPopoverOpen = (shouldBeOpen = !isPopoverOpen) => {
    setIsPopoverOpen(shouldBeOpen);
  };
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((user) => {
      return user.username.toLowerCase().startsWith(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }

    if (filteredData.length === 0) {
      toggleIsPopoverOpen(false);
    }
    toggleIsPopoverOpen(true);
  };

  const input = (
    <EuiFieldText
      aria-label="Popover attached to input element"
      className="input-search"
      compressed={true}
      type="text"
      placeholder={placeholder}
      user={wordEntered}
      onChange={handleFilter}
    />
  );

  return (
    <EuiInputPopover
      input={input}
      isOpen={isPopoverOpen}
      closePopover={() => {
        toggleIsPopoverOpen(false);
      }}
    >
      {filteredData.length === 0 ? (
        <p className="toggle-noresults">no results</p>
      ) : (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((user) => {
            return (
              <Link
                className="euiLink euiLink--primary"
                to={`/users/${user.id}`}
                key={user.id}
              >
                <p className="toggle-results">{user.username}</p>
              </Link>
            );
          })}
        </div>
      )}
    </EuiInputPopover>
  );
}

export default Searchbar;
