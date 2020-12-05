import React from 'react';
import PropTypes from 'prop-types'

export default function Loading({ message = 'Loading' }) {
    const [content, setContent] = React.useState(message)

    React.useEffect(() => {
        const id = window.setInterval(() => {
            setContent((content) => {
                return content === `${message}...`
                    ? message
                    : `${content}.`
            })
        }, 300)

        return () => window.clearInterval(id)
    }, [message])

    return (
        <p className='title second-title'>{content}</p>
    )
}

Loading.propTypes = {
    message: PropTypes.string
}
