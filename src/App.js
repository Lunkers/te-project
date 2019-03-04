import React, { Component } from 'react';
import './App.css';
import AES from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
import TableView from './tableView';
import Sidebar from "./sidebar"

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { events: {}, isLoaded: false };
        this.getCalendarData = this.getCalendarData.bind(this);
    }

    componentDidMount() {
        this.getCalendarData();

    }

    getCalendarData() {
        fetch("https://projects.teamengine.com/calendar/events", { headers: { "x-teamengine-test": "YfKFyOBnLBvudfn" } }).then((response) => { return response.text() })
            .then(rStr => { return AES.decrypt(rStr, "teamengine-key").toString(enc) })
            .then(dec => {
                this.setState({
                    events: JSON.parse(dec).events,
                    isLoaded: true
                })
            });
    }
    render() {
        console.log(this.state.events)
        if (!this.state.isLoaded) {
            return (<p> loading... </p>)
        }
        this.state.events.sort((a,b) => {return Date.parse(a.date) - Date.parse(b.date)});
        return (
            <div className="App">
                <header className="App-header">
                    <h2>Super cool and trendy calendar for hip people</h2>

                </header>
                <div className="container">
                <Sidebar events = {this.state.events}></Sidebar>
                    <TableView events={this.state.events}></TableView>
                </div>
            </div>
        );
    }
}

export default App;