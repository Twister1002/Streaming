import React, { Component } from "react";
import PropTypes from "prop-types";

export default class LabelSettings extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            newLabel: { type: "file", label: "", value: ""},
            labels: [ ]
        };
        this.onSave = this.onSave.bind(this);
        this.onLabelSave = this.onLabelSave.bind(this);
        this.onRemoveLabel = this.onRemoveLabel.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onNewLabelDataChange = this.onNewLabelDataChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            labels: [...this.props.data]
        });
    }

    onValueChange(e) {
        const { name, value } = e.target;
        const labelInfo = {
            ...this.state[name],
            value
        };

        this.setState({
            [name]: labelInfo
        });
    }

    onNewLabelDataChange(e) {
        const { name, value } = e.target;

        this.setState({
            newLabel: {
                ...this.state.newLabel,
                [name]: value
            }
        });
    }

    onRemoveLabel(e) {
        const labels = [...this.state.labels].filter((elem, i) => i !== Number(e.target.getAttribute("data-id")));

        this.setState({ labels });
    }

    onLabelSave(e) {
        if (this.state.newLabel.label && this.state.newLabel.type) {
            const labels = [...this.state.labels];
            labels.push({...this.state.newLabel});

            this.setState({ labels });
        }
    }

    onSave() {
        this.props.onSave("labels", this.state.labels);
    }

    render() {
        return (
            <div id="label-settings">
                
                <header>
                    <h1>Labels</h1>
                    <h3>New Label</h3>
                    <div>
                        <select name="type" onChange={this.onNewLabelDataChange} value={this.state.newLabel.type} >
                            <option value="file" defaultValue>File</option>
                            <option value="text">Text</option>
                        </select>
                        <input type="text" name="label" onChange={this.onNewLabelDataChange} value={this.state.newLabel.label} />
                        <button onClick={this.onLabelSave}>Save Label</button>
                    </div>
                </header>
                
                {
                    this.state.labels.map( (labelInfo, i) => {
                        return (
                            <div key={`label_${i}`} className="label-options">
                                <label htmlFor={`${labelInfo.label}_${i}`}>{labelInfo.label}</label>
                                <input 
                                    id={`${labelInfo.label}_${i}`} 
                                    type={labelInfo.type} 
                                    name="value" 
                                    value={labelInfo.value} 
                                    onChange={this.onValueChange} 
                                />
                                <span onClick={this.onRemoveLabel} data-id={i}>&times;</span>
                            </div>
                        );
                    })
                }

                <button onClick={this.onSave}>Save</button>
            </div>
        )
    }
}

LabelSettings.propTypes = {
    data: PropTypes.array,
    onSave: PropTypes.func.isRequired
}

