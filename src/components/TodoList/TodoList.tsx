import React, { useRef, useState } from 'react';
import { List } from '@material-ui/core';
import TodoItem from '../TodoItem/TodoItem';

interface ITodo {
  id: string;
  description: string;
  isDone: boolean;
}
interface ITodoStatus {
  isDone: boolean;
}

interface ITodoListProps {
  todos: ITodo[];
  onToggleCompleted: (todoId: string, body: ITodoStatus) => void;
  onDeleteTodo: (todoId: string) => void;
}

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  onDeleteTodo,
  onToggleCompleted,
}) => {
  return (
    <List>
      {todos?.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </List>
  );
};

export default TodoList;
