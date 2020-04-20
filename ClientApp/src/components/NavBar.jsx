import React from 'react'
import { Link } from 'react-router-dom'
import '../custom.scss'
const NavBar = () => {
  return (
    <section className="navigation">
      <nav className="navBar">
        <li>
          <Link className="navItem" to="/">
            Sleep
          </Link>
        </li>
        <li>
          <Link className="navItem" to="/stats">
            Stats
          </Link>
        </li>
        <li>
          <Link className="navItem" to="*">
            Pref
          </Link>
        </li>
      </nav>
    </section>
  )
}

export default NavBar
