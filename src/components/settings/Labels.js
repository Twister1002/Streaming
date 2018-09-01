import React, { Component } from "react";
import PropTypes from "prop-types";

export default class LabelSettings extends Component {
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
        this.props.onSave("labels", this.state);
    }

    render() {
        return (
            <div id="label-settings">
                Label
                <button onClick={this.onSave}>Save</button>
            </div>
        )
    }
}

LabelSettings.propTypes = {
    data: PropTypes.object,
    onSave: PropTypes.func.isRequired
}

