import React from 'react';
import {connect} from "react-redux";
import Task from "./Task";

const Column = (props) => {
    return (
        <div className="col">
            <h3 style={{color:"green",marginTop:"20px"}}>{props.status.toUpperCase()}</h3>
            { props.tasks
            .filter(el => el.status === props.status)
            .map(task => <Task key={task.id}
                               task={task}/>)}
        </div>
    )};
const mapStateToProps = (state) => ({
    tasks: state.tasks
})
export default connect(mapStateToProps)(Column);