import React from 'react';
import './Header.css';
import logo from './contactsTrackerLogo.png';
import Link from "@material-ui/core/Link";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export default function header() {
    // const preventDefault = (event) => event.preventDefault();
    return (
        <div className="Header">
            <div className="left">
                <Link to="/"><img className="contactsTrackerLogo" src={logo} alt="Contacts Tracker Logo"/></Link>
            </div>
        </div>
    );
}
