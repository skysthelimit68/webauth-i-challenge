import React from 'react';
import axios from 'axios';
import User from './User';

axios.defaults.withCredentials = true; 

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            users : []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        let users = await axios.get("http://localhost:4000/api/users/");
        this.setState({
            users: users.data.users
        })
        console.log(this.state.users);

    }
    handleLogout = event =>  {
        event.preventDefault();
        axios.delete('http://localhost:4000/api/restricted/')
        .then( res => {
            this.setState({
                users : []
            })
            this.props.history.push('/login');

            console.log(res)
        })
        .catch( error => {
            console.log(error)
        })
    }
   

    render() {
        return(
            <div>
                {this.state.users.map(user => <User user={user} key={user.id}/> )}
                <div>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        )
    }

}

export default Users;