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
            <React.Fragment>
                {story &&
                    (<section>
                        <h2 className='title second-title'>
                            <a className='story-link' href={story.url}>{story.title}</a>
                        </h2>
                        <Credits story={story} />
                    </section>)
                }
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
            </React.Fragment>
        )
    }
}