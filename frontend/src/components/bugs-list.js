import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Bug = props =>(
    <tr>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{props.bug.title}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{props.bug.description}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{props.bug.date.substr(0, 10)}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{props.bug.dueDate.substr(0, 10)} at {new Date(props.bug.dueDate).toLocaleTimeString()}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            {Math.floor((Date.parse(props.bug.dueDate)-new Date().getTime())/(1000*60*60*24))} days|
            {Math.floor((Date.parse(props.bug.dueDate)-new Date().getTime()) % (1000*60*60*24) / (1000*60*60))} hours|
            {Math.floor(((Date.parse(props.bug.dueDate)-new Date().getTime()) % (1000*60*60))/(1000*60))} minutes|
            {Math.floor(((Date.parse(props.bug.dueDate)-new Date().getTime()) % (1000*60))/1000)} seconds
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{props.bug.assignee}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <Link to={"/edit/" + props.bug._id} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border 
                border-blue-500 rounded mx-1">
                Edit</Link>
            <a href='#' onClick={()=>{props.deleteBug(props.bug._id)}} 
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mx-1 border border-red-500 rounded">
                Resolved</a>
         </td>
    </tr>
)
const Bugg = props =>(
    <tr>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell bg-red-600">{props.bug.title}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell bg-red-600">{props.bug.description}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell bg-red-600">{props.bug.date.substr(0, 10)}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell bg-red-600">{props.bug.dueDate.substr(0, 10)} at {new Date(props.bug.dueDate).toLocaleTimeString()}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell bg-red-600">
            <strong>OVERDUE BY: </strong>
            {-Math.floor((Date.parse(props.bug.dueDate)-new Date().getTime())/(1000*60*60*24))} days|
            {-Math.floor((Date.parse(props.bug.dueDate)-new Date().getTime()) % (1000*60*60*24) / (1000*60*60))} hours|
            {-Math.floor(((Date.parse(props.bug.dueDate)-new Date().getTime()) % (1000*60*60))/(1000*60))} minutes|
            {-Math.floor(((Date.parse(props.bug.dueDate)-new Date().getTime()) % (1000*60))/1000)} seconds
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell bg-red-600">{props.bug.assignee}</td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell bg-red-600">
            <Link to={"/edit/" + props.bug._id} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border 
                border-blue-500 rounded mx-1">
                Edit</Link>
            <a href='#' onClick={()=>{props.deleteBug(props.bug._id)}} 
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mx-1 border border-red-500 rounded">
                Resolved</a>
         </td>
    </tr>
)

export default class BugsList extends Component{

    constructor(props){
        super(props);
        this.deleteBug = this.deleteBug.bind(this);
        this.state = {bugs: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/bugs/')
            .then(response=>{
                this.setState({bugs: response.data})
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    deleteBug(id){
        axios.delete('http://localhost:5000/bugs/' + id)
            .then(res=> console.log(res.data));
        this.setState({
            bugs: this.state.bugs.filter(bug => bug._id !== id)
        })
    }

    bugList(){
        return this.state.bugs.map(currentbug => {
            if ((Math.floor(((Date.parse(currentbug.dueDate)-new Date().getTime()) % (1000*60))/1000)) < 0){
                return <Bugg bug={currentbug} deleteBug={this.deleteBug} key={currentbug._id}/>;
            }
            return <Bug bug={currentbug} deleteBug={this.deleteBug} key={currentbug._id}/>;
        })
    }

    render(){
        return(
            <div class="rounded-t-xl overflow-hidden bg-gradient-to-r  p-10 flex flex-col justify-center items-center">
                <h3 class="block text-gray-1000 font-bold md:text-right my-10 text-2xl">Bug List</h3>
                <table class="min-w-full border-collapse block md:table">
                    <thead class="block md:table-header-group">
                        <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                            <th class="bg-teal-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Title</th>
                            <th class="bg-teal-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Description</th>
                            <th class="bg-teal-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Date Added</th>
                            <th class="bg-teal-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Due Date</th>
                            <th class="bg-teal-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Time Left</th>
                            <th class="bg-teal-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Assignee</th>
                            <th class="bg-teal-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="block md:table-row-group ">
                        {this.bugList()}
                    </tbody>
                </table>
            </div>
        )
    }
}