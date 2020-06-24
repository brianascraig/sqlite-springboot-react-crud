import React, {Component} from 'react';
import './ContactsList.css';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/contacts/'
});

class ContactsList extends Component {

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
            <div className="ContactsList">

                <TableContainer component={Paper}>
                    <Table className="table" aria-label="customized table">
                        <TableHead className="head">
                            <TableRow>
                                <TableCell className="styledTableCell">First Name</TableCell>
                                <TableCell className="styledTableCell" align="right">Last Name</TableCell>
                                <TableCell className="styledTableCell" align="right">Email</TableCell>
                                <TableCell className="styledTableCell" align="right">Phone Number</TableCell>
                            </TableRow>
                        </TableHead>
                                <TableBody className="body">
                                    {this.state.members.map(member =>
                                        <TableRow className="tableRow" key={member.id}>
                                            <TableCell component="th" scope="row">
                                                {member.first_name}
                                            </TableCell>
                                            <TableCell className="styledTableCell" align="right">{member.last_name}</TableCell>
                                            <TableCell className="styledTableCell" align="right">{member.email}</TableCell>
                                            <TableCell className="styledTableCell" align="right">{member.phone_number}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
            </div>
        )
    }
}

export default ContactsList;
