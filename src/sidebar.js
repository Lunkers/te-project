import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <h3>Upcoming events:</h3>
                <ul className="sidebar-list">{this.props.events.map(event => {
                    return <li className="sidebar-item" key={event.database_id}>
                        <div className="sidebar-event">
                            <h3>{event.title}</h3>
                            <p>{event.date}</p>
                        </div>
                    </li>
                }
                )}</ul>
            </div>
        );
    }


}
export default Sidebar;