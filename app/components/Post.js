import React from 'react'
import queryString from 'query-string'
import { getItem, getItems } from '../utils/api'
import Credits from './Credits'
import Loading from './Loading'
import { ThemeConsumer } from '../contexts/theme'

export default class Post extends React.Component {
    state = {
        loadingStory: true,
        loadingComments: false,
        story: null,
        comments: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)

        if (id) {
            getItem(id)
                .then((story) => {
                    this.setState({
                        loadingStory: false,
                        loadingComments: true,
                        story
                    })

                    getItems(story.kids)
                        .then((comments) => {
                            this.setState({
                                loadingComments: false,
                                comments: comments.filter((comment) => comment && comment.dead !== true)
                            })
                        })
                })
        }
    }

    render() {
        const { loadingStory, loadingComments, story, comments } = this.state

        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <React.Fragment>
                        { loadingStory && <Loading message='Fetching Post' />}
                        {!loadingStory &&
                            (<section>
                                <h2 className='title second-title'>
                                    <a className='story-link' href={story.url}>{story.title}</a>
                                </h2>
                                <Credits story={story} />
                            </section>)
                        }
                        {loadingComments && <Loading message='Fetching Comments' />}
                        {!loadingComments &&
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
                )}
            </ThemeConsumer>
        )
    }
}