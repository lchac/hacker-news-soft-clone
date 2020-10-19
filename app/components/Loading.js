import React from 'react';
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
    state = {
        content: this.props.message
    }

    componentDidMount(prevProps, prevState) {
        const { message } = this.props

        this.interval = setInterval(() => {
            this.state.content === message + '...'
                ? this.setState({ content: message })
                : this.setState(prevState => {
                    return { content: prevState.content + '.' }
                })
        }, 300)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <p className='title second-title'>{this.state.content}</p>
        )
    }
}


Loading.propTypes = {
    message: PropTypes.string.isRequired
}

Loading.defaultProps = {
    message: 'Loading'
}