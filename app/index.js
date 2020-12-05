import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import Nav from './components/Nav'
import Feed from './components/Feed'
import Post from './components/Post'
import User from './components/User'
import Loading from './components/Loading'
import { ThemeProvider } from './contexts/theme'

function HackerNews() {
    const [theme, setTheme] = React.useState('light')
    const toggleTheme = () => setTheme(theme => theme === 'light' ? 'dark' : 'light')

    return (
        <ThemeProvider value={theme}>
            <div className={theme}>
                <div className='container'>
                    <Router>
                        <h1 className='first-title'>Hacker News</h1>
                        <Nav toggleTheme={toggleTheme} />
                        <React.Suspense fallback={<Loading />}>
                            <Route exact path={['/', '/top']} render={() => <Feed />} />
                            <Route path='/new' render={() => <Feed selectedFeed='new' />} />
                            <Route path='/post' component={Post} />
                            <Route path='/user' component={User} />
                        </React.Suspense>
                    </Router>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default HackerNews;

ReactDOM.render(
    <HackerNews />,
    document.getElementById('app')
)