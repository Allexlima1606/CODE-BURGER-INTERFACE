import React from 'react'
import formatCurrency from '../../utils/formatCurrency'
import { useCart } from '../../hooks/CartContext'
import { Container} from './styles'

export function CartItems () {
  const { cartProducts } = useCart()
  return (
    <Container>
      <header>
        <p></p>
        <p>Items</p>
        <p>Preço</p>
        <p>Quantidade</p>
        <p>Total</p>
      </header>

      {cartProducts && cartProducts.map( product => (
        <body key={product.id}>
          <img src={product.url} />>
          <p>{product.name}</p>
          <p>{formatCurrency(product.price)}</p>
          <p>{product.quantity}</p>
          <p>{formatCurrency(product.quantity*product.price)}</p>
      </body>
      ))}
    </Container>
  )
}
