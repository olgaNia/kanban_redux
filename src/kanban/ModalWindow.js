import React from 'react';
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {Button, InputGroup, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form'

function ModalWindow(props) {
    const [inputCheck, setInputCheck] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState(props.statuses[0])
    const [priority, setPriority] = useState(props.priorities[0])
    const handleYesButton = () => {
        props.deleteTask(props.task.id)
        props.closeModal()
    }

    useEffect(() => {
        setInputCheck('')
    }, [props.task])

    const onSaveCreate =()=>{
       const newTask = {id: Math.random().toString(), name, description, status, priority}
       props.createNewTask(newTask)
        props.closeModal()
        setName('')
        setDescription('')
        setPriority(props.priorities[0])
        setStatus(props.statuses[0])
    }

    if (props.mode === "Create") {
        return (
            <>
                <Modal show={props.isOpen} onHide={props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                            <Form.Control
                                value={name}
                                onChange={event => setName(event.target.value)}
                                placeholder="Enter task's name"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                            <Form.Control
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                placeholder="Enter name's description"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <Form.Select
                            aria-label="Default select example"
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}>
                            {props.statuses.map((el,index) =>
                            <option key={index} value={el}>{el}</option>
                            )}
                        </Form.Select>
                        <hr/>
                        <Form.Select
                            aria-label="Default select example"
                            value={priority}
                            onChange={(event) => setPriority(event.target.value)}>
                            {props.priorities.map((el,index)=>
                            <option key={index} value={el}>{el}</option>
                            )}
                        </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={props.closeModal}>
                            Close
                        </Button>
                        <Button variant="outline-primary" onClick={onSaveCreate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    if (props.mode === "Delete") {
        return (
            <>
                <Modal show={props.isOpen} onHide={props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this task?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Repeat <b>{props.task?.name}</b> to delete:
                      <p></p>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={inputCheck}
                                onChange={event => setInputCheck(event.target.value)}
                                placeholder="Enter task's name"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary"
                                onClick={props.closeModal}>
                            Close
                        </Button>
                        <Button variant="outline-primary"
                                onClick={handleYesButton}
                                disabled={inputCheck !== props.task?.name}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    if (props.mode === "Edit") {
        return (
            <>
                <Modal show={props.isOpen} onHide={props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                            <Form.Control
                                value={name}
                                onChange={event => setName(event.target.value)}
                                placeholder="Enter task's name"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                            <Form.Control
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                placeholder="Enter name's description"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => setStatus(event.target.value)}>
                            <option value={status}>Status</option>
                        </Form.Select>
                        <hr/>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => setPriority(event.target.value)}>
                            <option value={priority}>Priority</option>
                        </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={props.closeModal}>
                            Close
                        </Button>
                        <Button variant="outline-primary" onClick={props.closeModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities,
    isOpen: state.modalWindowData.isOpen,
    mode: state.modalWindowData.mode,
    task: state.modalWindowData.task,
})
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({type: "TOGGLE_MODAL", payload: {}}),
    deleteTask: (id) => dispatch({type: "DELETE_TASK", payload: id}),
    createNewTask: (newTask) => dispatch({type: "CREATE_TASK", payload: newTask})

})
export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow)
