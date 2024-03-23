import PropTypes from 'prop-types'
import React from 'react'

import { ErrorMessagesstyles } from './styles'

export function ErrorMessage({ children }) {
  return <ErrorMessagesstyles>{children}</ErrorMessagesstyles>
}

ErrorMessage.propTypes = {
  children: PropTypes.string
}
