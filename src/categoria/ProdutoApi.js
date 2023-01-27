
export function get(idCategoria) {
  return fetch('https://lojavirtual-api--tarleylana.repl.co/api/v1/produtos?idCategoria=' + idCategoria)
          .then(res => res.json())
          .catch(err => {
            console.error(`Falha ao tentar obter todas os produtos da categoria ${idCategoria}. Motivo: ${err.message}`);
            return [];
          })
}