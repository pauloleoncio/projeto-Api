import React from 'react';
import { render, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import HomeScreen from '../HomeScreen';
import * as CategoriaApi from '../CategoriaApi';

beforeAll(() => {
  CategoriaApi.getAll = jest.fn(() => responseOK);
});

test('Antes de carregar as categorias, o sistema deve exibir uma mensagem informando que está carregando', () => {
  
  let textLoading = null;
  
  act(() => {
    const component = render(<HomeScreen />, {wrapper: MemoryRouter});
    textLoading = component.getByText(/Carregando.../i);
  });

  expect(textLoading).toBeInTheDocument();
})

test('Após a execução da API, o sistema deve exibir as categorias', async () => {
  const component = render(<HomeScreen />, {wrapper: MemoryRouter});
  
  let categoriaAndroid = null;
  let categoriaIOS = null;
  let categoriaWindows = null;
  let categoriaLinux = null;
  await wait(() => {
    categoriaAndroid = component.getByText('Android');
    categoriaIOS = component.getByText('IOS');
    categoriaWindows = component.getByText('Windows');
    categoriaLinux = component.getByText('Linux');
  });
  
  expect(CategoriaApi.getAll).toHaveBeenCalled();

  expect(categoriaAndroid).toBeInTheDocument();
  expect(categoriaIOS).toBeInTheDocument();
  expect(categoriaWindows).toBeInTheDocument();
  expect(categoriaLinux).toBeInTheDocument();

  expect(component.getByTestId('homescreen')).toMatchSnapshot();
})

const responseOK = [
  {
    id: 1,
    nome: "Android",
    ativa: true,
    img64: 'https://lojavirtual-api--tarleylana.repl.co/img/android/android_64x64.png',
    img128: 'https://lojavirtual-api--tarleylana.repl.co/img/android/android_128x128.png',
    img256: 'https://lojavirtual-api--tarleylana.repl.co/img/android/android_256x256.png'
  },
  {
    id: 2,
    nome: "IOS",
    ativa: true,
    img64: 'https://lojavirtual-api--tarleylana.repl.co/img/ios/ios_64x64.png',
    img128: 'https://lojavirtual-api--tarleylana.repl.co/img/ios/ios_128x128.png',
    img256: 'https://lojavirtual-api--tarleylana.repl.co/img/ios/ios_256x256.png'
  },
  {
    id: 3,
    nome: "Windows",
    ativa: true,
    img64: 'https://lojavirtual-api--tarleylana.repl.co/img/windows/windows_64x64.png',
    img128: 'https://lojavirtual-api--tarleylana.repl.co/img/windows/windows_128x128.png',
    img256: 'https://lojavirtual-api--tarleylana.repl.co/img/windows/windows_256x256.png'
  },
  {
    id: 4,
    nome: "Linux",
    ativa: true,
    img64: 'https://lojavirtual-api--tarleylana.repl.co/img/linux/linux_64x64.png',
    img128: 'https://lojavirtual-api--tarleylana.repl.co/img/linux/linux_128x128.png',
    img256: 'https://lojavirtual-api--tarleylana.repl.co/img/linux/linux_256x256.png'
  }
]