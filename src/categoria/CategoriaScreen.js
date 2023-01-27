import React, {useState, useEffect} from 'react';

import {
  useHistory,
  useParams
} from 'react-router-dom';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';

import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

import Header from '../home/Header';
import Footer from  '../home/Footer';

import './CategoriaScreen.css';

import {getAll} from '../home/CategoriaApi';
import {get} from './ProdutoApi';

/*
const categorias = [
  {nome: "Categoria 1", ativa: true},
  {nome: "Categoria 2", ativa: true},
  {nome: "Categoria 3", ativa: true},
  {nome: "Categoria 4", ativa: true},
]

const produtos = [
  {nome: 'Produto 1', descricao: 'Descrição do produto 1', imagem: '[Imagem do produto]'},
  {nome: 'Produto 2', descricao: 'Descrição do produto 2', imagem: '[Imagem do produto]'},
  {nome: 'Produto 3', descricao: 'Descrição do produto 3', imagem: '[Imagem do produto]'},
  {nome: 'Produto 4', descricao: 'Descrição do produto 4', imagem: '[Imagem do produto]'},
]
*/

export default function CategoriaScreen({adicionarProduto}) {
  const history = useHistory();
  const {id} = useParams()

  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const valoresCategorias = await getAll();
   
      setCategorias(valoresCategorias);

      setLoading(false);
    }

    fetchData();
  }, [])

  useEffect(() => {
    async function fetchData() {
      const valoresProdutos = await get(id);
      setProdutos(valoresProdutos);
    }

    fetchData();
  }, [id])

  const items = [
    {
      label: 'Quer ver outras categorias?',
      items: categorias.map(c => {
        return {
          label: c.nome,
          command: () => history.push(`/categorias/${c.id}`)
        }
      })
    }
  ]

  return (
    <>
      <Header titulo={`Categoria  ${id}`}/>
      <nav>
        <button onClick={() => history.push('/compras')}>Ver Carrinho de Compras</button>
      </nav>
      <section>
        <nav>
          <Menu model={items} />
        </nav>
        
        {/* TABELA DE PRODUTOS */}
        <aside>
          {loading && <h1>Carregando...</h1>}
          <table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {
                produtos.map(prod => (
                  <tr key={prod.id}>
                    <td><img src={prod.img} alt={prod.nome} /></td>
                    <td>
                      <p>{prod.nome}</p>
                      <p>{prod.descricao}</p>
                    </td>
                    <td>{prod.preco}</td>
                    <td>
                      <Button
                        label="Comprar"
                        icon="pi pi-check"
                        iconPos="right"
                        className="p-button-raised p-button-rounded p-button-success"
                        onClick={() => adicionarProduto(prod)}
                      />
                    </td>
                  </tr>

                ))

              }
            </tbody>


          </table>
        </aside>
      </section>
      <Footer />
    </>
  )
}