import React, { useRef, useState } from 'react';
import { List } from '@material-ui/core';
import TodoItem from '../TodoItem/TodoItem';
import { ITodoListProps } from '../../interfaces/Todo.interface';
import styles from './TodoList.module.scss';

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
