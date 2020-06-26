import React from 'react';
import './Contacts.css';
import ContactsGrid from "./ContactsGrid/ContactsGrid";
import Container from "@material-ui/core/Container";
import ContactManagement from "./ContactManagement/ContactManagement";
import ContactsList from "./ContactsList/ContactsList";
import ContactsFinder from "./ContactsFinder/ContactsFinder";
import ContactCreation from "./ContactManagement/ContactCreation/ContactCreation";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// export default function contacts() {
//     return (
        {/*<div className="Contacts"*/}
            {/*<div className="contactsContainer">*/}
            {/*    <Container maxWidth="md">*/}
            {/*        <Button><Link href="http://localhost:3000/api/contacts/create-contact">Add New</Link></Button>*/}
            {/*        <Button><Link to={ContactsGrid}>Grid View</Link></Button>*/}
            {/*        <Button><Link to={ContactsList}>List View</Link></Button>*/}
            {/*        <Button><Link to={ContactManagement}>Manage Contacts</Link></Button>*/}
            {/*        <ContactsFinder/>*/}
            {/*    </Container>*/}
            {/*</div>*/}

            {/*<div*/}


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Contacts() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="List View" {...a11yProps(0)} />
                        <Tab label="Grid View" {...a11yProps(1)} />
                        <Tab label="Add New" {...a11yProps(2)} />
                        <Tab label="Manage" {...a11yProps(3)} />
                        <Tab label="Search" {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <ContactsList/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ContactsGrid/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ContactCreation/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ContactManagement/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <ContactsFinder/>
                </TabPanel>
            </Container>

        </div>
    );
}

