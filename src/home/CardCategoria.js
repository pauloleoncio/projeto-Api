import React from 'react';

export default function CardCategoria({nome, ativo, img}) {
  return (
    <div>
      <h6>{nome}</h6>
      <img src={img} alt={nome}/>
    </div>
  )
}