import React from 'react';
import PropTypes from 'prop-types'
import { formatDatetime } from '../utils/helpers'
import { NavLink as Link } from 'react-router-dom'

export default function Credits({ story }) {
    return (
        <React.Fragment>
            {(story.descendants || story.descendants === 0) &&
                <span className='credits'>
                    by <Link to={`/user?id=${story.by}`}>{story.by}</Link> on {formatDatetime(story.time)} with <Link to={`/post?id=${story.id}`}>{story.descendants}</Link> comments.
                </span>
            }
            {!story.descendants && story.descendants !== 0 &&
                <span className='credits'>
                    by <Link to={`/user?id=${story.by}`}>{story.by}</Link> on {formatDatetime(story.time)}
                </span>
            }
        </React.Fragment>
    )
}

Credits.propTypes = {
    story: PropTypes.object.isRequired
}