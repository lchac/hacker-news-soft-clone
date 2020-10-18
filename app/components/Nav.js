import React from 'react';
import { NavLink } from 'react-router-dom'

export default function Nav() {
    return (
        <React.Fragment>
            <nav className='row space-between'>
                <ul className='row'>
                    <li><NavLink
                        to='/'
                        exact
                        className='nav-link'>
                        Top
                            </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/new'
                            className='nav-link'>
                            New
                            </NavLink>
                    </li>
                </ul>
                <button className='btn btn-clear'>
                    🔦
                    </button>
            </nav>
        </React.Fragment>
    );
}
