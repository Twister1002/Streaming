import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SocialSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: ""
        }

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
        this.props.onSave("social", this.state);
    }

    render() {
        return (
            <div id="social-settings">
                <h1>Social Settings</h1>
                <div className="social">
                    <div className="facebook">
                        <div className="icon icon-facebook"></div>
                        <input 
                            type="text" 
                            name="facebook" 
                            onChange={this.onValueChange}
                            value={this.state.facebook}
                        />
                    </div>
                    <div className="twitter">
                        <div className="icon icon-twitter"></div>
                        <input 
                            type="text" 
                            name="twitter" 
                            onChange={this.onSocialNameChange}
                            value={this.state.twitter}
                        />
                    </div>
                    <div className="instagram">
                        <div className="icon icon-instagram"></div>
                        <input 
                            type="text" 
                            name="instagram" 
                            onChange={this.onSocialNameChange}
                            value={this.state.instagram}
                        />
                    </div>
                    <div className="youtube">
                        <div className="icon icon-youtube"></div>
                        <input 
                            type="text" 
                            name="youtube" 
                            onChange={this.onSocialNameChange}
                            value={this.state.youtube}
                        />
                    </div>
                </div>
                <button onClick={this.onSave}>Save</button>
            </div>
        )
    }
}

SocialSettings.propTypes = {
    data: PropTypes.object,
    onSave: PropTypes.func.isRequired
}
