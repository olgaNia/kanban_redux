import React from "react";
import {connect} from "react-redux";
import Column from "./Column";
import ModalWindow from "./ModalWindow";

const KanbanBoard = (props) => {

    return (
        <div>
            <h1 style={{color:"indianred",margin:"20px"}}>{props.appName}</h1>

            <button type="button"
                    className="btn btn-outline-info"
                    onClick={() => props.openModal(props.task, "Create")}
            >
                Create New Task
            </button>

            <div className="container text-center" >
                <div className="row align-items-start">
                    {props.statuses.map((el, index) =>
                        <Column
                            key={index}
                            status={el}/>)}
                </div>
            </div>
            <ModalWindow/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    appName: state.appName,
    statuses: state.statuses,
})
const mapDispatchToProps=(dispatch)=>({
    openModal: (task, mode) => dispatch({
        type: "TOGGLE_MODAL",
        payload: {task, mode}
    }),
})
export default connect(mapStateToProps,mapDispatchToProps)(KanbanBoard);