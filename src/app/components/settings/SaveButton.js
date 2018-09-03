import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SaveButton extends Component {
    constructor(props) {
        super(props);

        this.onSaveClick = this.onSaveClick.bind(this);
    }

    onSaveClick(e) {
        const button = e.target;

        button.disabled = true;
        button.innerText = "Saving...";

        this.props.onSettingSave();

        setTimeout( () => {
            button.disabled = false;
            button.innerText = "Save";
        }, 1000)
    }

    render() {
        return (
            <button onClick={this.onSaveClick}>Save</button>
        )
    }
}

SaveButton.propTypes = {
    onSettingSave: PropTypes.func.isRequired
}