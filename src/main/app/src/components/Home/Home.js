import React from 'react';
import './Home.css';
import Contacts from "../Contacts/Contacts";

export default function home() {
    return (
        <div className="Home">
            <Contacts className="contactsStyle"/>
        </div>
    );
}
