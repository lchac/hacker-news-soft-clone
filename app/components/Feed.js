import React from 'react';
import PropTypes from 'prop-types'
import { getTopStories, getNewStories } from '../utils/api'
import Loading from './Loading'
import StoryList from './StoryList';

export default class Feed extends React.Component {
    state = {
        loading: true,
        stories: null
    }

    componentDidMount() {
        this.updateFeed(this.props.selectedFeed)
    }

    updateFeed = (selectedFeed) => {
        const quantity = 50
        if (selectedFeed === 'top') {
            getTopStories(quantity)
                .then((stories) => {
                    this.setState({
                        loading: false,
                        stories: stories.filter((story) => story)
                    })
                })
        } else if (selectedFeed === 'new') {
            getNewStories(quantity)
                .then((stories) => {
                    this.setState({
                        loading: false,
                        stories: stories.filter((story) => story)
                    })
                })
        }
    }

    render() {
        const { loading, stories } = this.state
        return (
            <React.Fragment>
                {loading && <Loading />}
                {!loading && <StoryList stories={stories} />}
            </React.Fragment>
        )
    }
}

Feed.propTypes = {
    selectedFeed: PropTypes.string.isRequired
}

Feed.defaultProps = {
    selectedFeed: 'top'
}