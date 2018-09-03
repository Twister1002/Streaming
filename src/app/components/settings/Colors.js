import React, { Component } from "react";
import PropTypes from "prop-types";
import { ChromePicker as ColorPicker } from "react-color";

import SaveButton from "./SaveButton";

export default class ColorSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: {
                background: "",
                text: "",
            },
            activePicker: ""
        }

        this.onSave = this.onSave.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onShowColorPicker = this.onShowColorPicker.bind(this);
    }

    componentDidMount() {
        this.setState({
            settings: this.props.data
        });
    }

    onValueChange(color) {
        const { hex, rgb } = color;
        const settings = this.state.settings;
        settings[this.state.activePicker] = {
            hex, rgb
        };

        this.setState(settings);
    }

    onSave() {
        this.props.onSave("layout", this.state.settings);
    }

    onShowColorPicker(e) {
        const {value} = e.target;

        if (value) {
            if (this.state.activePicker === value) {
                this.setState({ activePicker: null });
            }
            else {
                this.setState({ activePicker: value });
            }
        }
    }

    render() {
        return (
            <div id="color-settings">
            <h1>Colors / Layout Options</h1>
                {
                    Object.entries(this.state.settings).map(([setting, value]) => {
                        return (
                            <div key={setting}>
                                <label htmlFor={`${setting}-picker`}>{setting}:</label>
                                <button 
                                    id={`${setting}-picker`} 
                                    style={{backgroundColor: value.hex}}
                                    onClick={this.onShowColorPicker}
                                    value={setting}
                                >
                                        &nbsp;
                                    </button>
                                {
                                    this.state.activePicker === setting &&
                                    <React.Fragment>
                                        <ColorPicker onChangeComplete={this.onValueChange} name={setting} color={value.hex} />
                                        <button onClick={this.onShowColorPicker} value={setting}>Close</button>
                                    </React.Fragment>
                                }
                            </div>
                        )
                    })
                }
                <SaveButton onSettingSave={this.onSave} />
            </div>
        )
    }
}

ColorSettings.propTypes = {
    data: PropTypes.object,
    onSave: PropTypes.func.isRequired
}

