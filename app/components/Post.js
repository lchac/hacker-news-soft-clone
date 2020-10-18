import React from 'react';
import queryString from 'query-string'
import { getItem, getItems } from '../utils/api'
import Credits from './Credits'

export default class Post extends React.Component {
    state = {
        story: null,
        comments: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)

        if (id) {
            getItem(id)
                .then((story) => {
                    getItems(story.kids)
                        .then((comments) => {
                            this.setState({
                                story,
                                comments: comments.filter((comment) => comment)
                            })
                        })
                })
        }
    }

    render() {
        const { story, comments } = this.state

        return (
            <ul className='comments'>
                {story && comments && comments.map((comment) => (
                    <li key={comment.id}>
                        <div className='comment'>
                            <Credits story={story} />
                            <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                        </div>
                    </li>
                ))
                }
            </ul>
        )
    }
}