import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TwitchSettings extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.data;
        this.onSave = this.onSave.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentDidMount() {
        this.setState(this.props.data);
    }

    onValueChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    onSave() {
        this.props.onSave("twitch", this.state);
    }

    render() {
        return (
            <div id="twitch-settings">
                Twitch
                <button onClick={this.onSave}>Save</button>
            </div>
        )
    }
}

TwitchSettings.propTypes = {
    data: PropTypes.object,
    onSave: PropTypes.func.isRequired
}
