import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {connect} from "react-redux";
import {useEffect, useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalWindow(props) {
    const [inputCheck, setInputCheck] = useState("")
const handleYesButton=()=>{
    props.deleteTask(props.task.id)
    props.closeModal()
}
useEffect(()=>{
    setInputCheck('')
},[props.task])

    if(props.mode ==="Delete")
    { return (


        <Modal
            open={props.isOpen}
            // onClose={}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    Repeat <b>{props.task.name}</b> to delete
                    <input type="text" value={inputCheck} onChange={event => setInputCheck(event.target.value)}/>
                </Typography>
                <Button onClick={handleYesButton}
                disabled = {inputCheck !== props.task.name}
                >
                    Yes,I'm sure
                </Button>
                <Button onClick={() => props.closeModal()}>
                    Cancel
                </Button>
            </Box>

        </Modal>

    );}
    if(props.mode ==="Update"){
        return(
            <Modal
                open={props.isOpen}
                // onClose={}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Repeat <b>{props.task.name}</b> to delete
                        <input type="text" value={inputCheck} onChange={event => setInputCheck(event.target.value)}/>
                    </Typography>
                    <Button onClick={handleYesButton}
                            disabled = {inputCheck !== props.task.name}
                    >
                        Yes,I'm sure
                    </Button>
                    <Button onClick={() => props.closeModal()}>
                        Cancel
                    </Button>
                </Box>

            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    isOpen: state.modalWindowData.isOpen,
    mode: state.modalWindowData.mode,
    task: state.modalWindowData.task
})
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({type: "TOGGLE_MODAL", payload: {}}),
    deleteTask: (id) => dispatch({type: "DELETE_TASK", payload: id})
})
export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow)
