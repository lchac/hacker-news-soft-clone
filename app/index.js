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

class HackerNews extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }

    render() {
        return (
            <ThemeProvider value={this.state}>
                <div className={this.state.theme}>
                    <div className='container'>
                        <Router>
                            <h1 className='title first-title'>Hacker News</h1>
                            <Nav />
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
}

export default HackerNews;

ReactDOM.render(
    <HackerNews />,
    document.getElementById('app')
)