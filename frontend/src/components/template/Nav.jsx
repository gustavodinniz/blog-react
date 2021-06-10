import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                Home Page
            </Link>
            <Link to="/posts">
                Nova Postagem
            </Link>
            <Link to="/edit">
                Editar Postagem
            </Link>
        </nav>
    </aside>