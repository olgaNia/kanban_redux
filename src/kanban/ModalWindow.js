import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';


const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
        m: 1,
    },
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalWindow(props) {
    const [inputCheck, setInputCheck] = useState("")
    const handleYesButton = () => {
        props.deleteTask(props.task.id)
        props.closeModal()
    }
    useEffect(() => {
        setInputCheck('')
    }, [props.task])

    if (props.mode === "Delete") {
        return (
            <Modal
                open={props.isOpen}
                // onClose={}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title"
                                variant="h6"
                                component="h2">
                        Are you sure you want to delete this task?
                    </Typography>
                    <Typography id="modal-modal-description"
                                sx={{mt: 2}}>
                        Repeat <b>{props.task.name}</b> to delete:
                        <TextField type="text"
                                   variant="outlined"
                                   sx={{width: 500,
                                       maxWidth: '100%'}}
                                   value={inputCheck}
                                   onChange={event => setInputCheck(event.target.value)}/>
                    </Typography>
                    <ButtonGroup variant="outlined"
                                 aria-label="outlined button group">
                        <Button onClick={handleYesButton}
                                disabled={inputCheck !== props.task.name}
                                color="error">
                            Yes,I'm sure
                        </Button>
                        {" "}
                        <Button onClick={() => props.closeModal()}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        );
    }
    if (props.mode === "Update") {
        return (
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
                            disabled={inputCheck !== props.task.name}
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
