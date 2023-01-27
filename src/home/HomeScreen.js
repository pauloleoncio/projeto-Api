import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

import Header from './Header';
import TextoSite from './TextoSite';
import CardCategoria from './CardCategoria';
import Footer from './Footer';

import './HomeScreen.css';

import {getAll} from './CategoriaApi';
/*
const valores = [
  {id: 1, nome: "Categoria 1", ativa: true},
  {id: 2, nome: "Categoria 2", ativa: true},
  {id: 3, nome: "Categoria 3", ativa: true},
  {id: 4, nome: "Categoria 4", ativa: true},
  {id: 5, nome: "Categoria 5", ativa: false},
  {id: 6, nome: "Categoria 6", ativa: true},
  {id: 7, nome: "Categoria 7", ativa: true},
  {id: 8, nome:"Categoria 8", ativa: true},
  {id: 9, nome:"Categoria 9", ativa: true}
]
*/

function HomeScreen() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [msg, setMsg] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const valores = await getAll();
        setCategorias(valores);
      } catch(err) {
        setMsg(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <Header />
      <section data-testid="homescreen">
        <article>
          <TextoSite />
        </article>
        <aside>
            {loading && <h1>Carregando...</h1>}
            {msg && <h1>
                      {msg}
                      <button onClick={history.push('/')} >Atualizar</button>
                    </h1>}
            {
              categorias
                .filter(cat => cat.ativa === true)
                .map( cat => (
                  <Link key={cat.id} to={`/categorias/${cat.id}`}>
                    <CardCategoria
                      nome={cat.nome} 
                      ativo={cat.ativa}
                      img={cat.img128}
                    />
                  </Link>
              ))
          }
        </aside>
      </section>
      <Footer />
    </>
  )
}

export default HomeScreen;