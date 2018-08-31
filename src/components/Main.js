import React, { Component } from "react";

import Streaming from "./Stream";
import Settings from "./Settings";

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStreaming: window.location.search.includes("stream")
        }
    }

    render() {
        return (
            <div className="main">
                {this.state.isStreaming ? (
                    <Streaming />
                ) : (
                    <Settings />
                )}
            </div>
        )
    }
}