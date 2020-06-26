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
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/contacts/'
});


class ContactManagement extends Component {

    constructor() {
        super();
        this.getMembers();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.filterMember = this.filterMember.bind(this);
    }

    state = {
        members: [],
        open: false,
        currentMemberId: null,
        currentMember: []

    };

    filterMember = (id) => {
        let currentMemberArr= this.state.members.filter(member => member.id === id);
        this.setState({ currentMember: currentMemberArr }, () => {
            console.log(this.state.currentMember, 'currentMemberState');
        });
        // console.log("currentMemberId: "+ this.state.currentMemberId+ ", currentMemberArr: " + currentMemberArr + ", state.currentMember: " + this.state.currentMember);

    };

    handleClickOpen = (id) => {
        let memberId = id;
        this.setState({ open: true }, () => {
            console.log(this.state.open, 'openStatus');
        });
        this.setState({ currentMemberId: memberId }, () => {
            console.log(this.state.currentMemberId, 'currentMemberIdState');
        });
        // this.setState({open: true
        // });
        // this.setState({currentMemberId: memberId});
        // console.log("currentMemberId: " + memberId + "stateCurrentMemberId: "  + this.state.currentMemberId);
        this.filterMember(memberId);
    };
    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let id = document.getElementById("idUpdate").value;
        let firstName = document.getElementById("firstNameUpdate").value;
        let lastName = document.getElementById("lastNameUpdate").value;
        let email = document.getElementById("emailUpdate").value;
        let phone = document.getElementById("phoneUpdate").value;
        this.updateMember(id, firstName, lastName, email, phone);
        console.log("id: " + id +", first name: " + firstName + ", last name: " + lastName + ", phone: "
            + phone + ", email: " + email);
    };

    deleteMember = async (id) => {
        let data = await api.delete(`/${id}`);
    };

    getMembers = async () => {
        let data = await api.get('/').then(({data}) => data);
        this.setState({members: data});
    };

    updateMember = async (id, firstName, lastName, email, phone) => {
        await api.put(`/${id}`, {first_name: firstName, last_name: lastName,
            email: email, phone_number: phone})
    };


    // handleDelete(id){
    //     // event.preventDefault();
    //     this.deleteMember(id).then();
    // }

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
                                <TableCell className="styledTableCell" align="left">Edit</TableCell>
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
                                    <TableCell className="styledTableCell" align="right">
                                        <Button onClick={()=>this.deleteMember(member.id)}>Delete</Button></TableCell>
                                    <TableCell className="styledTableCell" align="right">
                                        <Button variant="outlined" color="primary" onClick={()=>this.handleClickOpen(member.id)}>
                                            Edit
                                        </Button>
                                        /></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
                            </DialogContentText>
                            {this.state.currentMember.map(member =>
                            <form className="formStyles" onSubmit={this.handleSubmit} key={member.id}>

                                            <TextField id="idUpdate" disabled={true} defaultValue={member.id}/>
                                            <TextField id="firstNameUpdate" label="First Name" variant="filled" defaultValue={member.first_name}/>
                                            <TextField id="lastNameUpdate" label="Last Name" variant="filled" defaultValue={member.last_name}/>
                                            <TextField id="emailUpdate" label="Email" variant="outlined" defaultValue={member.email}/>
                                            <TextField id="phoneUpdate" label="Phone Number" variant="filled" defaultValue={member.phone_number}/>
                                            <Button type="submit">Save</Button>

                            </form>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>


        )
    }
}

export default ContactManagement;
