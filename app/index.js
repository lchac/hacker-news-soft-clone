import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import Nav from './components/Nav'
import StoryList from './components/StoryList'
import Post from './components/Post'
import User from './components/User'

class HackerNews extends React.Component {
    render() {
        return (
            <div className='container'>
                <Router>
                    <h1>Hacker News</h1>
                    <Nav />
                    <Route exact path={['/', '/top']} render={() => <StoryList selectedFeed='top' />} />
                    <Route path='/new' render={() => <StoryList selectedFeed='new' />} />
                    <Route path='/post' component={Post} />
                    <Route path='/user' component={User} />
                </Router>
            </div>
        )
    }
}

export default HackerNews;

ReactDOM.render(
    <HackerNews />,
    document.getElementById('app')
)