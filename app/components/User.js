import React from 'react';
import queryString from 'query-string'
import { formatDatetime } from '../utils/helpers'
import { getUser, getItems } from '../utils/api'
import Credits from './Credits'

export default class User extends React.Component {
    state = {
        user: null,
        posts: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
        if (id) {
            getUser(id)
                .then((user) => {
                    getItems(user.submitted)
                        .then((items) => {
                            this.setState({
                                user,
                                posts: items.filter((item) => item && item.type === 'story')
                            })
                        })
                })
        }
    }

    render() {
        const { user, posts } = this.state
        return (
            <div>
                {user &&
                    (<div>
                        <h2>{user.id}</h2>
                        <p>joined {formatDatetime(user.created)} has {user.karma} karma</p>
                        <p dangerouslySetInnerHTML={{ __html: user.about }}></p>
                    </div>)
                }
                {posts && posts.map((post) => (
                    <Credits story={post} />
                ))}
            </div>
        )
    }
}