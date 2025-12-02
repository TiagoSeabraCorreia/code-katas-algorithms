const dataBase = [
    {id: 1, title: 'Task 1', done: false},
    {id: 2, title: 'Task 2', done: false},
];

export interface Task{
    id: number, title: string, done: boolean
}

async function fetchTodoList(){
    return dataBase;
}

async function toggleTaskDone(id: number) {
    const task = dataBase.find(t => t.id === id);
    if(task){
        task.done = !task.done;
    }
    else return null;
    return task;
}

export function createTodoListService(){
    return{
        fetchTodoList,
        toggleTaskDone
    }
}