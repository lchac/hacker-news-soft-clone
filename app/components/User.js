import React from 'react'
import queryString from 'query-string'
import { formatDatetime } from '../utils/helpers'
import { getUser, getItems } from '../utils/api'
import StoryList from './StoryList'
import Loading from './Loading'

function userReducer(state, action) {
    if (action.type === 'userSuccess') {
        return {
            loadingUser: false,
            loadingPosts: true,
            user: action.user,
            posts: null
        }
    } if (action.type === 'itemsSuccess') {
        return {
            ...state,
            loadingPosts: false,
            posts: action.posts.filter((item) => item && item.type === 'story' && item.deleted !== true)
        }
    } if (action.type === 'error') {
        return {
            loadingUser: false,
            loadingPosts: false,
            error: action.error
        }
    } else {
        throw new Error('This action is not supported')
    }
}

export default function User({ location }) {
    const { id } = queryString.parse(location.search)
    const [state, dispatch] = React.useReducer(
        userReducer,
        { loadingUser: true, loadingPosts: false, user: null, posts: null }
    )

    React.useEffect(() => {
        if (id) {
            getUser(id)
                .then((user) => {
                    dispatch({ type: 'userSuccess', user })
                    if (user) {
                        getItems(user.submitted)
                            .then((items) => {
                                dispatch({
                                    type: 'itemsSuccess',
                                    posts: items.filter((item) => item && item.type === 'story' && item.deleted !== true)
                                })
                            })
                    } else {
                        dispatch({ type: 'error', error: 'No user found' })
                    }
                })
        }
    }, [id])

    const { loadingUser, loadingPosts, user, posts, error } = state

    return (
        <React.Fragment>
            {error && <b>{error}</b>}
            {loadingUser && <Loading message='Fetching User' />}
            {!loadingUser && user &&
                (<section>
                    <h2 className='title second-title'>{user.id}</h2>
                    <p>joined <b>{formatDatetime(user.created)}</b> has <b>{user.karma}</b> karma</p>
                    <div className='item-content' dangerouslySetInnerHTML={{ __html: user.about }}></div>
                </section>)
            }
            {loadingPosts && <Loading message='Fetching repos' />}
            {!loadingPosts && posts &&
                <section>
                    <h3 className='title third-title'>Posts</h3>
                    <StoryList stories={posts} />
                </section>
            }
            {!loadingPosts && posts && posts.length === 0 && <p className='center-text'>This user hasn't posted yet</p>}
        </React.Fragment>
    )

}

