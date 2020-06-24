import React, {Component} from 'react';
import './ContactsGrid.css';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/contacts/'
});

class ContactsGrid extends Component {

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


    render() {
        return (
            <div className="ContactsGrid">
                <Grid container spacing={3}>
                    {this.state.members.map(member =>
                        <Grid item xs={4} key={member.id}>
                            <Paper className="paper">
                                <ul>
                                    <li >{member.first_name} {member.last_name}</li>
                                    <li>{member.email}</li>
                                    <li>{member.phone_number}</li>
                                </ul>
                            </Paper>
                        </Grid>
                )};
                </Grid>
            </div>
        )
    }
}

export default ContactsGrid;
