

export function getAll() {
  return fetch('https://lojavirtual-api--tarleylana.repl.co/api/v1/categorias/')
            .then(res => res.json())
            .catch(err => {
              console.error('Falha ao tentar obter todas as categorias ' + err.message);
              throw new Error('Não foi possivel recuperar as categorias. Favor tentar novamente.')
            })
}

export function insert() {
  
}