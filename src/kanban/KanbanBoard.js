import {connect} from "react-redux";
import Column from "./Column";
import Button from "@mui/material/Button";
import * as React from "react";
import ModalWindow from "./ModalWindow";

const KanbanBoard = (props) => {

    return (
        <div>
            <h1>{props.appName}</h1>

            <button type="button"
                    className="btn btn-outline-info">
                Create New Task
            </button>

            <div className="container text-center">
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
export default connect(mapStateToProps)(KanbanBoard);