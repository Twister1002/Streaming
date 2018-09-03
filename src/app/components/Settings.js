import React, { Component } from "react";
import {HashRouter as Router, Route, Switch, Link} from "react-router-dom";
const {ipcRenderer} = window.require("electron");

import TwitchSettings from "./settings/Twitch";
import SocialSettings from "./settings/Social";
import ColorsSettings from "./settings/Colors";
import LabelSettings from "./settings/Labels";

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = ipcRenderer.sendSync("getSettingsData");
        this.onSettingsSave = this.onSettingsSave.bind(this);
    }

    onSettingsSave(setting, data) {
        this.setState({
            [setting]: data
        }, () => { 
            ipcRenderer.sendSync("saveSettingData", this.state); 
        });
    }

    render() {
        return (
            <Router>
                <div className="settings" style={{backgroundColor: this.state.layout.background.hex}}>
                    <nav>
                        <Link to="/colors">Colors</Link>
                        <Link to="/labels">Labels</Link>
                        <Link to="/social">Social Media</Link>
                        <Link to="/twitch">Twitch Account</Link>
                    </nav>
                    <Switch>
                        <Route path="/twitch" render={(props) => {
                            return (
                                <TwitchSettings
                                    {...props}
                                    onSave={this.onSettingsSave}
                                    ipcRenderer={ipcRenderer}
                                    data={this.state.twitch}
                                />
                            );
                        }} />
                        <Route path="/labels" render={(props) => {
                            return (
                                <LabelSettings
                                    {...props}
                                    onSave={this.onSettingsSave}
                                    ipcRenderer={ipcRenderer}
                                    data={this.state.labels}
                                />
                            );
                        }} />
                        <Route path="/social" render={(props) => {
                            return (
                                <SocialSettings
                                    {...props}
                                    onSave={this.onSettingsSave}
                                    ipcRenderer={ipcRenderer}
                                    data={this.state.social}
                                />
                            );
                        }} />
                        <Route path="/colors" render={(props) => {
                            return (
                                <ColorsSettings
                                    {...props}
                                    onSave={this.onSettingsSave}
                                    ipcRenderer={ipcRenderer}
                                    data={this.state.layout}
                                />
                            );
                        }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
