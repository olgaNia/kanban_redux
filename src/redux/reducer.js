const initialState= {
    tasks: [
        {name: 'task 1', id: 111, description: 'do kanban', status: 'todo',priority: 1},
        {name: 'task 2', id: 112, description: 'do list', status: 'in progress',priority: 2},
        {name: 'task 3', id: 113, description: 'do homework', status: 'in progress',priority: 3},
        {name: 'task 4', id: 114, description: 'do articles', status: 'review',priority: 1},
        {name: 'task 5', id: 115, description: 'do list of profitable goods', status: 'done',priority: 2},
    ],
    statuses: [
        'todo', 'in progress', 'review', 'done',
    ],
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    appName: "Kanban Board App",
    modalWindowData : {
        isOpen: false,
        mode: "",
        task:{},
    }
}
function reducer(state = initialState, action){
    switch (action.type){

        case "CREATE_TASK": return state

        case "CHANGE_TASK_STATUS":
            console.log(action.payload)
            const oldIndexStatus = state.statuses.indexOf(action.payload.initialStatus)
            const newIndex= oldIndexStatus + action.payload.direction
            const newStatus = state.statuses[newIndex]
            const changeTaskStatus = state.tasks.map(task =>
            task.id === action.payload.id ? {...task,status: newStatus} : task)
            return {...state,tasks:changeTaskStatus}

        case "CHANGE_PRIORITY_UP":
            const newTasksUp= state.tasks.map(task =>
                task.id === action.payload ? {...task, priority : task.priority + 1} : task)
            return {...state,tasks:newTasksUp}

        case "CHANGE_PRIORITY_DOWN":
            const newTasksDown= state.tasks.map(task =>
                task.id === action.payload ? {...task, priority : task.priority - 1} : task)
            return {...state,tasks : newTasksDown}

        case "EDIT_TASK": return state

        case "DELETE_TASK":
            const deleteTask = state.tasks.filter(elem => elem.id !== action.payload)
            return {...state,tasks : deleteTask}

        case "TOGGLE_MODAL": return {...state,
            modalWindowData: {...state.modalWindowData,
                isOpen : !state.modalWindowData.isOpen,task: action.payload.task, mode: action.payload.mode}}

        default: return state
    }
}

export default reducer;