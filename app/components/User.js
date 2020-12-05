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

                    getItems(user.submitted)
                        .then((items) => {
                            dispatch({
                                type: 'itemsSuccess',
                                posts: items.filter((item) => item && item.type === 'story' && item.deleted !== true)
                            })
                        })
                })
        }
    }, [id])

    return (
        <React.Fragment>
            {state.loadingUser && <Loading message='Fetching User' />}
            {!state.loadingUser &&
                (<section>
                    <h2 className='title second-title'>{state.user.id}</h2>
                    <p>joined <b>{formatDatetime(state.user.created)}</b> has <b>{state.user.karma}</b> karma</p>
                    <div className='item-content' dangerouslySetInnerHTML={{ __html: state.user.about }}></div>
                </section>)
            }
            {state.loadingPosts && <Loading message='Fetching repos' />}
            {!state.loadingPosts &&
                <section>
                    <h3 className='title third-title'>Posts</h3>
                    <StoryList stories={state.posts} />
                </section>
            }
            {!state.loadingPosts && state.posts && state.posts.length === 0 && <p className='center-text'>This user hasn't posted yet</p>}
        </React.Fragment>
    )

}

