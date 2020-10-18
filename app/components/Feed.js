import React from 'react';
import PropTypes from 'prop-types'
import { getTopStories, getNewStories } from '../utils/api'
import StoryList from './StoryList';

export default class Feed extends React.Component {
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
            <StoryList stories={stories} />
        )
    }
}

Feed.propTypes = {
    selectedFeed: PropTypes.string.isRequired
}