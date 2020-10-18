import React from 'react';
import PropTypes from 'prop-types'
import { formatDatetime } from '../utils/helpers'

export default function Credits({ story }) {
    return (
        <p>by <a href={`/user?id=${story.by}`}>{story.by}</a> on {formatDatetime(story.time)} with <a href={`/post?id=${story.id}`}>{story.descendants}</a> comments.</p>
    )
}

Credits.propTypes = {
    story: PropTypes.object.isRequired
}