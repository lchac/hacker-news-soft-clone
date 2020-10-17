import React from 'react'
import ReactDOM from 'react-dom'

class HackNews extends React.Component {
    render() { 
        return ( 
            <div>
                Hello World!
            </div>
        )
    }
}

export default HackNews;

ReactDOM.render(
    <HackNews />,
    document.getElementById('app')
)