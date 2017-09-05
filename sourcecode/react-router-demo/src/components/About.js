import React, {Component} from 'react'

class About extends Component {
    render() {
        return (
            <div id="About">
                About
                <p>{this.props.match.params.id}</p>
            </div>
        )
    }
}

export default About
