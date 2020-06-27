import React, {Component} from 'react';
import './ContactsFinder.css';
import _ from 'lodash';
import faker from 'faker';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import axios from "axios";
import Paper from "@material-ui/core/Paper/Paper";

// export default function contactsFinder() {
//     return (
//         <div className="ContactsFinder">
//
//         </div>
//     );
// }
const api = axios.create({
    baseURL: 'http://localhost:8080/api/contacts/'
});


// let last_name;
// let first_name;
// let email;
// let phone_number;
// const source = _.times(5, () => ({
//     first_name: first_name,
//     last_name: last_name,
//     email: email,
//     phone_number: phone_number,
// }));


export default class ContactsFinder extends Component {
    constructor(props){
        super(props);
        this.getMembers();
    }
    initialState = {
        isLoading: false,
        results: [],
        value: '',
        members: []
    };
    state = this.initialState;



    getMembers = async () => {
        let data = await api.get('/').then(({data}) => data);
        this.setState({members: data});
    };

    // email = this.initialState.members.email;
    // first_name = this.initialState.members.first_name;
    // last_name = this.initialState.members.last_name;
    // phone_number = this.initialState.members.phone_number;


    handleResultSelect = (e, { result }) => this.setState({ value: result.full_name });


    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(this.initialState);

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = (result) => re[Symbol.match](`${result.full_name}`);

            this.setState({
                isLoading: false,
                results: _.filter(this.state.members, isMatch),
            })
        }, 300)
    };

    resultsRender = (results) => {
        return(
                <Grid item xs={4} key={results.id}>
                    <Paper className="paper">
                        <ul>
                            <li>{results.first_name} {results.last_name}</li>
                            <li>{results.email}</li>
                            <li>{results.phone_number}</li>
                        </ul>
                    </Paper>
                </Grid>
            )

    };

    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                            leading: true,
                        })}
                        results={results}
                        value={value}
                        resultRenderer={this.resultsRender}
                        {...this.props}
                    />
                </Grid.Column>
            {/*    <Grid.Column width={10}>*/}
            {/*        <Segment>*/}
            {/*            <Header>State</Header>*/}
            {/*            <pre style={{ overflowX: 'auto' }}>*/}
            {/*  {JSON.stringify(this.state, null, 2)}*/}
            {/*</pre>*/}
            {/*            <Header>Options</Header>*/}
            {/*            <pre style={{ overflowX: 'auto' }}>*/}
            {/*  {JSON.stringify(this.state, null, 2)}*/}
            {/*</pre>*/}
            {/*        </Segment>*/}
            {/*    </Grid.Column>*/}
            </Grid>
        )
    }
}

