import React from 'react'
import queryString from 'query-string'
import { getItem, getItems } from '../utils/api'
import Credits from './Credits'
import Loading from './Loading'

function postReducer(state, action) {
    if (action.type === 'postSuccess') {
        return {
            loadingStory: false,
            loadingComments: true,
            story: action.story,
            comments: null
        }
    } else if (action.type === 'commentsSuccess') {
        return {
            ...state,
            loadingComments: false,
            comments: action.comments.filter((comment) => comment && comment.dead !== true)
        }
    } else if (action.type === 'error') {
        return {
            loadingStory: false,
            loadingComments: false,
            story: null,
            comments: null,
            error: action.error
        }
    } else {
        throw new Error('This action is not supported')
    }
}

export default function Post({ location }) {
    const { id } = queryString.parse(location.search)

    const [state, dispatch] = React.useReducer(
        postReducer,
        { loadingStory: true, loadingComments: false, story: null, comments: null }
    )

    React.useEffect(() => {
        if (id) {
            getItem(id)
                .then((story) => {
                    dispatch({ type: 'postSuccess', story })
                    if (story) {
                        getItems(story.kids)
                            .then(comments => dispatch({ type: 'commentsSuccess', comments }))
                            .catch(error => dispatch({ type: 'error', error }))
                    } else {
                        dispatch({ type: 'error', error: 'No story found' })
                    }
                })
                .catch(error => dispatch({ type: 'error', error }))
        }
    }, [id])

    const { loadingStory, loadingComments, story, comments, error } = state

    return (
        <React.Fragment>
            {error && <b>{error}</b>}
            { loadingStory && <Loading message='Fetching Post' />}
            {!loadingStory && story &&
                (<section>
                    <h2 className='title second-title'>
                        <a className='story-link' href={story.url}>{story.title}</a>
                    </h2>
                    <Credits story={story} />
                </section>)
            }
            {loadingComments && <Loading message='Fetching Comments' />}
            {!loadingComments && comments &&
                <ul className='comments'>
                    {story && comments && comments.map((comment) => (
                        <li key={comment.id}>
                            <div className='comment'>
                                <Credits story={comment} />
                                <div className='item-content' dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                            </div>
                        </li>
                    ))
                    }
                </ul>
            }
        </React.Fragment>
    )
}
