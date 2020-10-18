import React from 'react';
import PropTypes from 'prop-types'
import { formatDatetime } from '../utils/helpers'

export default function Credits({ story }) {
    return (
        <React.Fragment>
            {(story.descendants || story.descendants === 0) &&
                <p className='credits'>
                    by <a href={`/user?id=${story.by}`}>{story.by}</a> on {formatDatetime(story.time)} with <a href={`/post?id=${story.id}`}>{story.descendants}</a> comments.
                </p>
            }
            {!story.descendants && story.descendants !== 0 &&
                <p className='credits'>
                    by <a href={`/user?id=${story.by}`}>{story.by}</a> on {formatDatetime(story.time)}
                </p>
            }
        </React.Fragment>
    )
}

Credits.propTypes = {
    story: PropTypes.object.isRequired
}