import React from 'react'

import CartLogo from '../../assets/Cart-image.svg'
import { CartItems} from '../../components'
import { Container, CartImg } from './styles'

export function Cart () {
  return (
    <Container>
      <CartImg src={CartLogo} alt="logo da carrinho" />
      <CartItems />
    </Container>
  )
}
