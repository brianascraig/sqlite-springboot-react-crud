import React, {Component} from 'react';
import './ContactManager.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/contacts/'
});
// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// }));

// const classes = useStyles();
// const [open, setOpen] = React.useState(false);


class ContactUpdateForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        setOpen: false,
        open: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let id = document.getElementById("id").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        this.updateMember(id, firstName, lastName, email, phone).then( );
        console.log("id: " + id +", first name: " + firstName + ", last name: " + lastName + ", phone: "
        + phone + ", email: " + email);
    };
   updateMember = async (id, firstName, lastName, email, phone) => {
       let data = await api.put(`/${id}`, {first_name: firstName, last_name: lastName,
            email: email, phone_number: phone})
       console.log("inside update");
    };
render() {
    return(
    <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Edit
        </Button>
        <Dialog open={this.handleClickOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                <form className="formStyles" onSubmit={this.handleSubmit}>
                    <TextField id="id" disabled={true} defaultValue={this.props.id}/>
                    <TextField id="firstName" label="First Name" variant="filled" placeholder={this.props.first_name}/>
                    <TextField id="lastName" label="Last Name" variant="filled" placeholder={this.props.last_name}/>
                    <TextField id="email" label="Email" variant="outlined" defaultValue={this.props.email}/>
                    <TextField id="phone" label="Phone Number" variant="filled" defaultValue={this.props.phone}/>
                    <Button type="submit">Add</Button>
                </form>
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
);
}


}

export default ContactUpdateForm;
