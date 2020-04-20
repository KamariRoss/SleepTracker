import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Navbar from './NavBar'

export function Layout(props) {
  return (
    <div>
      <Container>{props.children}</Container>
    </div>
  )
}
