import React from 'react';
import {connect} from "react-redux";

const Task = ({task, priorities, statuses, upChangePriority, downChangePriority, changeStatusTask, openModal}) => {

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <button type="button"
                            className="btn btn-outline-primary"
                            onClick={() => changeStatusTask(task.id, task.status, -1)}
                            disabled={task.status === statuses[0]}
                    >←
                    </button>
                    {' '}
                    {task.status}
                    {' '}
                    <button type="button"
                            className="btn btn-outline-primary"
                            onClick={() => changeStatusTask(task.id, task.status, 1)}
                            disabled={task.status === statuses[statuses.length - 1]}
                    >→
                    </button>
                </li>
                <li className="list-group-item">
                    <button
                        onClick={() => upChangePriority(task.id)}
                        disabled={priorities[priorities.length - 1] === task.priority}
                        type="button" className="btn btn-outline-success"
                    >↑
                    </button>
                    {' '}
                    Priority: {task.priority}
                    {' '}
                    <button
                        onClick={() => downChangePriority(task.id)}
                        disabled={priorities[0] === task.priority}
                        type="button" className="btn btn-outline-success">↓
                    </button>
                </li>
            </ul>
            <div className="card-body">

                <button type="button"
                        className="btn btn-outline-warning">
                    Edit
                </button>
                {' '}
                <button type="button"
                        className="btn btn-outline-danger"
                        onClick={() => openModal(task, "Delete")}>
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