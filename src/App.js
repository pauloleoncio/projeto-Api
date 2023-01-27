import React, {useState} from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';


import './App.css';

import HomeScreen from './home/HomeScreen';
import CategoriaScreen from './categoria/CategoriaScreen';
import CarrinhoScreen from './compras/CarrinhoScreen';

function App() {

  const [compras, setCompras] = useState([]);

  function adicionarProduto(produto) {
    let item = compras.find(c => c.produto.id === produto.id);

    if(!item) {
      item = {
        produto,
        quantidade: 1
      }

      compras.push(item);
    } else {
      item.quantidade = item.quantidade + 1;
    }
    
    setCompras(compras);

    console.log('adicionarProduto', JSON.stringify(compras));
  }

  function limparCompras() {
    setCompras([]);
  }

  function removerProduto(item) {
    const itens = compras.filter(c => c.produto.id !== item.produto.id)

    setCompras(itens);
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/">
              <HomeScreen />
          </Route>
          <Route path="/categorias/:id">
              <CategoriaScreen adicionarProduto={adicionarProduto} />
          </Route>
          <Route path="/compras">
              <CarrinhoScreen 
                compras={compras} 
                limpar={limparCompras}
                remover={removerProduto}
              />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )

}

export default App;
