import React from 'react';
import PropTypes from 'prop-types'
import { formatDatetime } from '../utils/helpers'

export default function Credits({ story }) {
    return (
        <React.Fragment>
            {(story.descendants || story.descendants === 0) &&
                <span className='credits'>
                    by <a href={`/user?id=${story.by}`}>{story.by}</a> on {formatDatetime(story.time)} with <a href={`/post?id=${story.id}`}>{story.descendants}</a> comments.
                </span>
            }
            {!story.descendants && story.descendants !== 0 &&
                <span className='credits'>
                    by <a href={`/user?id=${story.by}`}>{story.by}</a> on {formatDatetime(story.time)}
                </span>
            }
        </React.Fragment>
    )
}

Credits.propTypes = {
    story: PropTypes.object.isRequired
}