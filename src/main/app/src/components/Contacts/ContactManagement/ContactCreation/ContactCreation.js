import React, { Component } from "react";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/contacts/'
});

class ContactCreation extends Component {
    state = {
        members: []
    };


    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createContact = async (firstName, lastName, fullName, email, phone) => {
        await api.post('/',{ first_name: firstName,
            last_name: lastName, full_name: fullName,  email: email, phone_number: phone});

    };

    handleSubmit(event){
        event.preventDefault();
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let fullName = `${firstName} ${lastName}`;
        this.createContact(firstName, lastName, fullName, email, phone).then( );
        }

        render() {
            return (
            <div className="ContactCreation" id="create-contact">
                <form onSubmit={this.handleSubmit}>
                    <TextField id="firstName" label="First Name" variant="filled"/>
                    <TextField id="lastName" label="Last Name" variant="filled"/>
                    <TextField id="email" label="Email" variant="outlined"/>
                    <TextField id="phone" label="Phone Number" variant="filled"/>
                    <Button type="submit">Add</Button>
                </form>
            </div>
            )
        }


}

export default ContactCreation;
