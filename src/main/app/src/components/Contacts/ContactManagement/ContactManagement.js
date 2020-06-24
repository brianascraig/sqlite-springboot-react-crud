import React, {Component} from 'react';
import './ContactManagement.css';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/contacts/'
});

class ContactManagement extends Component {

    state = {
        members: []
    };

    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
        this.getMembers();
    }

    deleteMember = async (id) => {
        let data = await api.delete(`/${id}`);
    };

    getMembers = async () => {
        let data = await api.get('/').then(({data}) => data);
        this.setState({members: data});
    };

    handleDelete(event){
        event.preventDefault();
        let id = document.getKey().value;
        this.deleteMember(id).then();
    }

    render() {
        return (
            <div className="ContactsManagement">
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="customized table">
                        <TableHead className="head">
                            <TableRow>
                                <TableCell className="styledTableCell">First Name</TableCell>
                                <TableCell className="styledTableCell" align="right">Last Name</TableCell>
                                <TableCell className="styledTableCell" align="right">Email</TableCell>
                                <TableCell className="styledTableCell" align="right">Phone Number</TableCell>
                                <TableCell className="styledTableCell" align="left">Delete</TableCell>
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
                                    <TableCell className="styledTableCell" align="right"><Button onClick={this.handleDelete}>Delete</Button></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default ContactManagement;
