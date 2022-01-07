import React, {Component} from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker'

export default class CreateBug extends Component{
    constructor(props){ 
        super(props);
       
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this); 
        this.onChangeAssignee = this.onChangeAssignee.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            description: '',
            date: new Date(),
            assignee: '',
            users: [],
            distance: 0,
            dueDate: new Date(),
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response=>{
                if (response.data.length > 0) {
                    this.setState({
                      users: response.data.map(user => user.username),
                      username: response.data[0].username
                    })
                  }
            })
    }
    onChangeTitle(e){           this.setState({title: e.target.value});         }
    onChangeDescription(e){     this.setState({description: e.target.value});   }
    onChangeDate(date){         this.setState({date: date});                    }
    onChangeAssignee(e){        this.setState({assignee: e.target.value});      }
    
    onSubmit(e){
        e.preventDefault();
        // 259200000
        const bug = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            assignee: this.state.assignee,
            dueDate: new Date(this.state.date.getTime()+259200000),
        }
        console.log(bug)

        axios.post('http://localhost:5000/bugs/add', bug)
            .then(res=>console.log(res.data));

        window.location = '/';
    }

    render(){
        return(
            <div class="flex flex-col justify-center items-center">
                <h3 class="block text-gray-1000 font-bold md:text-right my-10 text-2xl">New Bug Form</h3>
                <form onSubmit={this.onSubmit} class="w-full max-w-sm">
                    <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Title: </label>
                            </div>
                            <div class="md:w-2/3">
                                <input type="text" required value={this.state.title} onChange={this.onChangeTitle}
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                                text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                                />
                            </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Description: </label>
                            </div>
                            <div class="md:w-2/3">
                                <input type="text" required value={this.state.description} onChange={this.onChangeDescription}
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                                text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                                />
                            </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Assignee: </label>
                        </div>
                        <div class="md:w-2/3">
                            <select ref="userInput" type="text" required value={this.state.assignee} onChange={this.onChangeAssignee}
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
                            text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500">
                                <option selected="selected" value="" disabled>--Select One--</option>
                            {
                                this.state.users.map(function(user) {
                                return <option 
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }
                            </select>    
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Date: </label>
                        </div>
                        <div class="md:w-2/3">
                        <DateTimePicker
                            onChange={this.onChangeDate}
                            value={this.state.date}
                        />
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