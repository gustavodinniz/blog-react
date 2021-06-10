import './Header.css'
import React from 'react'

export default props =>
    <header className="header d-none d-sm-flex flex-column">
        <h3 className="mt-3">
            {props.title}
        </h3>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>