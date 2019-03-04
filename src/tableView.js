import React, { Component } from 'react';

class TableView extends Component {

    constructor(props) {
        super(props)
        this.state = { selectedEvent: null }
    }

    render() {
        let dates = this.createCalendarGrid(1);
        if (this.state.selectedEvent == null) {
            return (
                <div className="calendar-container">
                    <h2 className="month">February:</h2>
                    <div className="calendar">
                        {dates}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="calendar-container">
                    <div className="back-button" onClick={() => this.setSelected(null)}>click to go back</div><h2>{this.state.selectedEvent.title}</h2>
                    <div className="event-info">
                        <div className="participants sidebar">
                            <h3>participants</h3>
                            <ul className = "sidebar-list">{this.state.selectedEvent.attendents.map(part => {
                                return(<li className = "sidebar-item">{part}</li>)
                            })}</ul>
                        </div>
                        <div className = "notes">
                            <p>{this.getDayOfWeek(this.state.selectedEvent.date)}, {this.getMonth(this.state.selectedEvent.date)} {this.getDate(this.state.selectedEvent.date)}</p>
                            <p>{this.state.selectedEvent.description}</p>
                            <p>location: {this.state.selectedEvent.location.lat} lat, {this.state.selectedEvent.location.lng} long (google maps API is expensive, look it up yourself)</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
    createCalendarGrid(month) {
        let dayList = []
        let date = new Date(2019, month, 1);
        while (date.getMonth() === month) {
            dayList.push(
                //add day to month grid
                <div className="day" key  = {date.getDate()}>
                    <p className="date">
                        {date.getDate()}

                    </p>
                    {this.props.events.map((event) => {
                        let a = new Date(Date.parse(event.date))
                        if (a.toDateString() === date.toDateString()) {
                            return (<div className="event" key={event.database_id} onClick={() => this.setSelected(event)}>{event.title}</div>)
                        }
                    })}
                </div>
            )

            date.setDate(date.getDate() + 1);
        }
        return dayList;
    }
    setSelected(event) {
        this.setState(state => {
            return { selectedEvent: event }
        });
    }

    getDayOfWeek(date){
        let dayOfWeek = new Date(date).getDay()
        let dayList =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return isNaN(dayOfWeek)? null: dayList[dayOfWeek]
    }

    getMonth(date){
        let month = new Date(date).getMonth()
        return isNaN(month) ? null : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month]
    }

    getDate(date){
        return new Date(date).getDate()
    }
}
export default TableView;