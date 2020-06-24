import React from 'react';
import './Footer.css';
import Link from "@material-ui/core/Link";
import logo from "./footerLogo.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export default function footer() {
    return (
        <div className="Footer">
            <div className="left">
                <Link to="/"><img className="contactsTrackerLogo" src={logo} alt="Contacts Tracker Logo"/></Link>
            </div>
            <div className="right">
                <div className="links">
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button><Link to="/api/contacts/create-contact">Add New</Link></Button>
                        <Button><Link to="/api/contacts/manage">Manage Contacts</Link></Button>
                        <Button><Link className="search" to="/api/contacts/finder">Search</Link></Button>
                    </ButtonGroup>
                </div>

            </div>
        </div>
    );
}
