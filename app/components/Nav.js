import React from 'react';
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

export default function Nav() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
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
                    <button className='btn btn-clear'
                        onClick={toggleTheme}>
                        {theme === 'light' ? '🔦' : '💡'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    );
}
