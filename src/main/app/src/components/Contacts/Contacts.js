import React from 'react';
import './Contacts.css';
import ContactsGrid from "./ContactsGrid/ContactsGrid";
import Container from "@material-ui/core/Container";
import ContactManagement from "./ContactManagement/ContactManagement";
import ContactsList from "./ContactsList/ContactsList";
import ContactsFinder from "./ContactsFinder/ContactsFinder";
import ContactCreation from "./ContactManagement/ContactCreation/ContactCreation";

export default function contacts() {
    return (
        <div className="Contacts">
            <div className="contactsContainer">
                <Container maxWidth="md">
                    <ContactCreation/>
                    <ContactsGrid/>
                    <ContactsList/>
                    <ContactsFinder/>
                    <ContactManagement/>
                </Container>
            </div>
        </div>
    );
}
