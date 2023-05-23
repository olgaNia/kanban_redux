import React from 'react';
import {connect} from "react-redux";

const Task = (props) => {

    return (
        <div className="card" style={{marginTop:"20px"}}>
            <div className="card-body">
                <h5 className="card-title">{props.task.name}</h5>
                <p className="card-text">{props.task.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <button type="button"
                            className="btn btn-outline-primary"
                            onClick={() => props.changeStatusTask(props.task.id, props.task.status, -1)}
                            disabled={props.task.status === props.statuses[0]}
                    > ← </button>
                    {' '}
                    {props.task.status}
                    {' '}
                    <button type="button"
                            className="btn btn-outline-primary"
                            onClick={() => props.changeStatusTask(props.task.id, props.task.status, 1)}
                            disabled={props.task.status === props.statuses[props.statuses.length - 1]}
                    > → </button>
                </li>
                <li className="list-group-item">
                    <button
                        onClick={() => props.upChangePriority(props.task.id)}
                        disabled={props.priorities[props.priorities.length - 1] === props.task.priority}
                        type="button" className="btn btn-outline-success"
                    > ↑ </button>
                    {' '}
                    Priority: {props.task.priority}
                    {' '}
                    <button
                        onClick={() => props.downChangePriority(props.task.id)}
                        disabled={props.priorities[0] === props.task.priority}
                        type="button" className="btn btn-outline-success"
                    > ↓ </button>
                </li>
            </ul>
            <div className="card-body">

                <button type="button"
                        className="btn btn-outline-warning"
                        onClick={() => props.openModal(props.task, "Edit")}
                >
                    Edit
                </button>
                {' '}
                <button type="button"
                        className="btn btn-outline-danger"
                        onClick={() => props.openModal(props.task, "Delete")}>
                    Delete
                </button>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    priorities: state.priorities,
    statuses: state.statuses,

})

const mapDispatchToProps = (dispatch) => ({
    upChangePriority: (id) => dispatch({
        type: "CHANGE_PRIORITY_UP",
        payload: id
    }),
    downChangePriority: (id) => dispatch({
        type: "CHANGE_PRIORITY_DOWN",
        payload: id
    }),
    changeStatusTask: (id, initialStatus, direction) => dispatch({
        type: "CHANGE_TASK_STATUS",
        payload: {id, initialStatus, direction}
    }),
    openModal: (task, mode) => dispatch({
        type: "TOGGLE_MODAL",
        payload: {task, mode}
    }),

})


export default connect(mapStateToProps, mapDispatchToProps)(Task);