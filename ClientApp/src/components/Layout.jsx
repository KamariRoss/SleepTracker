import React, { Component } from 'react'
import { Container } from 'reactstrap'

export function Layout(props) {
  return (
    <div>
      <Container>{props.children}</Container>
    </div>
  )
}
