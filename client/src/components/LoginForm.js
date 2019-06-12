import React from 'react';
import axios from 'axios';


class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    updateField = event => {
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    submitForm = event => {
        event.preventDefault();
        const creds = { username : this.state.username, password : this.state.password}
        axios.post('http://localhost:4000/api/restricted/login', creds)
        .then( res => {
            console.log(res);
            this.props.history.push('/users');
        })
        .catch( error => {
            console.log(error)
        })

        this.setState({
            username : "",
            password: ""
        })
        
}
    render() {
        return (
            <div>
                <form>
                    <input 
                        type="text"
                        name="username"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.updateField}
                    />
                    <input 
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.updateField}
                    />
                    <button onClick={this.submitForm}></button>
                </form>
            </div>
        )
}
}

export default LoginForm;