import React from 'react';

import {useHistory} from 'react-router-dom';

import Header from '../home/Header';
import Footer from '../home/Footer';

import './CarrinhoScreen.css';

export default function CarrinhoScreen({compras, limpar, remover}) {

  const history = useHistory();

  return(
    <>
      <Header />
      <nav id="botoes-nav">
        <button onClick={() => limpar()}>Limpar carrinho</button>
        <button onClick={() => history.push('/')}>Continuar comprando</button>
        <button>Finalizar compra</button>
      </nav>
      <section id="section-total">
        <span>Total da compra:</span>
        <span> R$ 1.587,55</span>
      </section>
      <section>
         <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {
              compras.map(c => (
                <tr key={c.produto.id}>
                  <td>
                    <img src={c.produto.img} alt={c.product.nome} />
                  </td>
                  <td>{c.produto.nome}</td>
                  <td>{c.quantidade}</td>
                  <td>{c.produto.preco}</td>
                  <td>{c.quantidade * c.produto.preco}</td>
                  <td>
                    <button onClick={() => remover(c)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
         </table>
      </section>
      <Footer />
    </>
  )
}