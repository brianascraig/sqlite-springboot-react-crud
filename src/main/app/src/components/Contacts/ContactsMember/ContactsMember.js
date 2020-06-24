import React, { Component } from "react";
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/contacts/'
});

class ContactsMember extends Component {

    state = {
        members: []
    };

    constructor() {
        super();
        this.getMembers();
    }

    getMembers = async () => {
        let data = await api.get('/').then(({data}) => data);
        this.setState({members: data});
    };

    createContact = async () => {
        let response = await api.post('/',{ first_name: "Percy",
            last_name: "Jones", email: "pjones@yahoo.com", phone_number: "5645878842"});
        console.log(response);
        this.getMembers();
    };

    deleteMember = async (id) => {
        let data = await api.delete(`/${id}`);
        this.getMembers();
    };

    updateMember = async (id, firstName, lastName, email, phone) => {
        let data = await api.put(`/${id}`, {first_name: firstName, last_name: lastName,
            email: email, phone_number: phone})
    };

    render() {
        return (
            <div className="ContactsMember">
                <Button onClick={this.createContact}>Create Contact</Button>
                {this.state.members.map(member => <h2 key={member.id} onClick={() =>
                    this.updateMember(member.id, "SpongeB",
                    "SquarePants", "spob@gmail.com", "53739352")}>
                    {member.first_name}
                    <Button onClick={()=> this.deleteMember(member.id)}>Delete</Button>

                </h2>)}


            </div>
        )
    }
}

export default ContactsMember;
