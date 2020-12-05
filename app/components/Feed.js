import React from 'react';
import PropTypes from 'prop-types'
import { getTopStories, getNewStories } from '../utils/api'
import Loading from './Loading'
import StoryList from './StoryList';

function storiesReducer(state, action) {
    console.log(state)
    if (action.type == 'success') {
        return {
            loading: false,
            stories: action.stories.filter((story) => story)
        }
    } if (action.type == 'error') {
        return {
            loading: false,
            stories: null,
            error: action.error
        }
    } else {
        throw new Error('Action type is not supported')
    }
}

export default function Feed({ selectedFeed = 'top' }) {
    const [state, dispatch] = React.useReducer(
        storiesReducer,
        { loading: true, stories: null }
    )

    React.useEffect(() => {
        const quantity = 50
        if (selectedFeed === 'top') {
            getTopStories(quantity)
                .then((stories) => dispatch({ type: 'success', stories }))
                .catch((error) => dispatch({ type: 'error', error }))
        } else if (selectedFeed === 'new') {
            getNewStories(quantity)
                .then((stories) => dispatch({ type: 'success', stories }))
                .catch((error) => dispatch({ type: 'error', error }))
        }

    }, [selectedFeed])

    return (
        <React.Fragment>
            {state.loading && <Loading />}
            {!state.loading && <StoryList stories={state.stories} />}
        </React.Fragment>
    )
}

Feed.propTypes = {
    selectedFeed: PropTypes.string
}
