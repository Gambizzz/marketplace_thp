import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, items }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
      <span onClick={toggleDropdown} className='btn-dropdown'>
        {title}
      </span>
      <div className="menu-drop">
        {items.map((item, index) => (
          <div key={index}>
            <Link to={item.link}> {item.label} </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

