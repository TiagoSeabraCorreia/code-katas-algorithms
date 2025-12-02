import { useEffect, useMemo, useState } from "react";
import { createTodoListService, type Task } from "./service";
import { createTodoListUseCase } from "./todoListUseCase";

export function TodoList() {
    const todoList  = useMemo(() => createTodoListUseCase(createTodoListService()), []);
    const [tasks, setTasks] = useState([] as Task[]);

    useEffect(() => {
        load();
    }, []);

    async function load(){
        const data = await todoList.getData();
        setTasks(data);
    }

    async function toggleTask(id: number){
        const newTask = await todoList.toggleDone(id);
        if (!newTask) return;

        setTasks(prev => prev.map((val: Task) => val.id == id ? newTask : val));
    }

    return (
        <div className="flex flex-row">
            {
                tasks.map((task: Task) => (
                    <div key={task.id} className="flex flex-row p-2 bg-slate-300" onClick={()=> toggleTask(task.id)}>
                        <span>{task.title}</span>
                        <span>{task.done ? "Feito" : "Por fazer" }</span>
                    </div>
                ))
            }
        </div>
    );
}
