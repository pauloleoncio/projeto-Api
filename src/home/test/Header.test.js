import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

test('Titulo do site foi exibido no Header', () => {
  const { getByText } = render(<Header />, {wrapper: MemoryRouter});
  const h1 = getByText(/Loja Virtual/i);
  expect(h1).toBeInTheDocument();
});

test('Ao informar um titulo, o header deve exibir este', () => {
  const {getByText } = render(<Header titulo="titulo de teste" />, {wrapper: MemoryRouter})
  const h1 = getByText(/titulo de teste/i);
  expect(h1).toBeInTheDocument();
});

test('Verifica a construção completa da tela', () => {
  const {getByTestId} = render(<Header />, {wrapper: MemoryRouter});
  const header = getByTestId('header');
  expect(header).toMatchSnapshot();
})