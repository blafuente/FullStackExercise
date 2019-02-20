import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Edit extends Component{
    constructor(){
        super();
        this.state={
            task: {}
        }
    }

    componentDidMount(){
        console.log(this.props);
        const tid = this.props.match.params.id;
        axios({
            method: 'GET',
            url: `http://localhost:3000/getTask/${tid}`
        }).then((taskFromBackEnd)=>{
            this.setState({
                task: taskFromBackEnd.data.task
            })
        })
    }

    changeTask = (e)=>{
        const value = e.target.value;
        const taskStateCopy = {...this.state.task}
        // taskStateCopy is now:
        //      {taskname: 'oil change', taskDate: '2019-02-20'}
        // let taskStateCopy = Object.assign({},this.state.task) <-- does the same thing as the line above it. 
        taskStateCopy.taskName = value; 
        this.setState({
            task: taskStateCopy
        })
    }

    changeDate = (e)=>{
        const value = e.target.value;
        let taskStateCopy = {...this.state.task}
        taskStateCopy.taskDate = value;
        this.setState({
            task: taskStateCopy
        })
    }

    editTask = (e) =>{
        e.preventDefault()
    }

    render(){
        console.log(this.state.task)
        return(
            <div className="container">
                <form onSubmit={this.addNewTask} className="add-box">
                    <input onChange={this.changeTask} type="text" id="new-task" value={this.state.task.taskName} />
                    <input onChange={this.changeDate} type="date" id="new-task-date" value={moment(this.state.task.taskDate).format('MMM-DD-YYYY')} />
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>            
            </div>
        )
    }
}

export default Edit;