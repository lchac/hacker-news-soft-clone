import React from 'react'
import queryString from 'query-string'
import { formatDatetime } from '../utils/helpers'
import { getUser, getItems } from '../utils/api'
import StoryList from './StoryList'
import Loading from './Loading'

export default class User extends React.Component {
    state = {
        loadingUser: true,
        loadingPosts: false,
        user: null,
        posts: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
        if (id) {
            getUser(id)
                .then((user) => {
                    this.setState({
                        loadingUser: false,
                        loadingPosts: true,
                        user
                    })
                    getItems(user.submitted)
                        .then((items) => {
                            this.setState({
                                loadingPosts: false,
                                posts: items.filter((item) => item && item.type === 'story' && item.deleted !== true)
                            })
                        })
                })
        }
    }

    render() {
        const { loadingUser, loadingPosts, user, posts } = this.state
        return (
            <React.Fragment>
                {loadingUser && <Loading message='Fetching User' />}
                {!loadingUser &&
                    (<section>
                        <h2 className='title second-title'>{user.id}</h2>
                        <p>joined <b>{formatDatetime(user.created)}</b> has <b>{user.karma}</b> karma</p>
                        <div className='item-content' dangerouslySetInnerHTML={{ __html: user.about }}></div>
                    </section>)
                }
                {loadingPosts && <Loading message='Fetching repos' />}
                {!loadingPosts &&
                    <section>
                        <h3 className='title third-title'>Posts</h3>
                        <StoryList stories={posts} />
                    </section>
                }
            </React.Fragment>
        )
    }
}