import type { createTodoListService } from "./service";


export function createTodoListUseCase(service: ReturnType<typeof createTodoListService>) {
    return {
        getData: () => service.fetchTodoList(),
        toggleDone: (id: number) => service.toggleTaskDone(id),
    };
}