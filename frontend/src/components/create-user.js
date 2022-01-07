import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAdmin = this.onChangeAdmin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            email: '',
            admin: false,
        }
    }
    onChangeUsername(e){    this.setState({username: e.target.value});  } 
    onChangePassword(e){    this.setState({password: e.target.value});  }
    onChangeEmail(e){       this.setState({email: e.target.value});     }
    onChangeAdmin(e){       this.setState({admin: e.target.value});     }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            admin: this.state.admin, 
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: '',
            password: '',
            email: '',
            admin: false,
        });
    }

    render(){
        return(
            <div class="flex flex-col justify-center items-center">
                <h3 class="block text-gray-1000 font-bold md:text-right my-10 text-2xl">New User Form</h3>
                <form onSubmit={this.onSubmit} class="w-full max-w-sm">
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Username: </label>
                        </div>
                        <div class="md:w-2/3">
                            <input type="text" required value={this.state.username} onChange={this.onChangeUsername} 
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                            text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                            />
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Password: </label>
                        </div>
                        <div class="md:w-2/3">
                            <input type="password" required value={this.state.password} onChange={this.onChangePassword} 
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                            text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                            />
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Email: </label>
                        </div>
                        <div class="md:w-2/3">
                            <input type="email" required value={this.state.email} onChange={this.onChangeEmail} 
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                            text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                            />
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Admin: </label> 
                        </div>
                        <div class="md:w-2/3">
                            <span class="mx-5">
                                <input type="radio" value={true} checked={this.state.admin == 'true'} onChange={this.onChangeAdmin} 
                                name="admin" required class="ml-2"
                                /> Yes
                            </span>
                            <span class="mx-5">
                                <input type="radio" value={false} checked={this.state.admin == 'false'} onChange={this.onChangeAdmin} 
                                name="admin" class="ml-2"
                                /> No
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center ">
                        <input  class="shadow bg-teal-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" />
                    </div>
                </form>

            </div>
        )
    }
}