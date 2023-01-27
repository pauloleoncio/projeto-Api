import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';

export default function Header({titulo = 'Loja Virtual'}) {
  return (
    <header data-testid="header">
      <Link to={'/'}>
        <img src={logo} alt="logo do sites"/>
      </Link>
      <h1>{titulo}</h1>
    </header>
  );
}

