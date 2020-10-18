import React from 'react';
import PropTypes from 'prop-types'
import { getTopStories, getNewStories } from '../utils/api'
import Credits from './Credits'

export default class StoryList extends React.Component {
    state = {
        stories: null
    }

    componentDidMount() {
        this.updateFeed(this.props.selectedFeed)
    }

    updateFeed = (selectedFeed) => {
        const quantity = 5
        if (selectedFeed === 'top') {
            getTopStories(quantity)
                .then((stories) => {
                    this.setState({
                        stories: stories.filter((story) => story)
                    })
                })
        } else if (selectedFeed === 'new') {
            getNewStories(quantity)
                .then((stories) => {
                    this.setState({
                        stories: stories.filter((story) => story)
                    })
                })
        }
    }

    render() {
        const { stories } = this.state
        return (
            <div className='story-item'>
                <ul>
                    {stories && stories.map((story) => (
                        <li key={story.id}>
                            <a href={story.url}>{story.title}</a><br />
                            <Credits story={story} />
                        </li>
                    ))}
                </ul>
                {this.props.children}
            </div>
        )
    }
}

StoryList.propTypes = {
    selectedFeed: PropTypes.string.isRequired
}