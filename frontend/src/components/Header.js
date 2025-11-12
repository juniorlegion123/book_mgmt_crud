import React from 'react';

const Header = ({ onAdd }) => {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo">📚 Mini Library</h1>
        <div>
          <button className="btn btn-primary" onClick={onAdd}>+ Add Book</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
