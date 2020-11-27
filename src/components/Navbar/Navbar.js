import React, { useState, Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItems } from './MenuItems'
import './Navbar.css'

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }


    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">React</h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    {this.state.clicked ?
                     <FontAwesomeIcon icon="times"/>:
                     <FontAwesomeIcon icon="bars"/>}
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 
                'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navbar;