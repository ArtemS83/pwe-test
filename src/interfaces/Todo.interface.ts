interface ITodo {
  id: string;
  description: string;
  isDone: boolean;
}

interface INewTodo {
  description: string;
}

interface ITodoStatus {
  isDone: boolean;
}

interface ITodoFormProps {
  onSubmit(text: string): void;
}

interface ITodoListProps {
  todos: ITodo[];
  onToggleCompleted: (todoId: string, body: ITodoStatus) => void;
  onDeleteTodo: (todoId: string) => void;
}

interface ITodoItemProps {
  todo: ITodo;
  onToggleCompleted: (todoId: string, body: ITodoStatus) => void;
  onDeleteTodo: (todoId: string) => void;
}

interface ISortButtonsProps {
  // todosItems: any;
  todosItems: {
    allTodosQuantity: number;
    completedTodosQuantity: number;
    notCompletedTodosQuantity: number;
  };
  onClickBySort(value: string | null): void;
}

export type {
  ITodo,
  INewTodo,
  ITodoStatus,
  ITodoFormProps,
  ITodoListProps,
  ITodoItemProps,
  ISortButtonsProps,
};
