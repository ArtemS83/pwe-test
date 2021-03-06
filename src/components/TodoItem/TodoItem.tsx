import React from 'react';
import styles from './TodoItem.module.scss';
import { ITodoItemProps } from '../../interfaces/Todo.interface';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  onToggleCompleted,
  onDeleteTodo,
}) => {
  const { id, description, isDone } = todo;

  const handleCompleted = () => {
    onToggleCompleted(id, { isDone: !isDone });
  };

  const handleDeleteTodo = () => {
    onDeleteTodo(id);
  };

  return (
    <>
      <ListItem divider className={styles.divItem}>
        <FormControlLabel
          className={styles.Label}
          control={
            <Checkbox
              checked={isDone}
              onChange={handleCompleted}
              color="primary"
            />
          }
          label={<ListItemText>{description}</ListItemText>}
        />
        <IconButton
          aria-label="Delete"
          type="button"
          onClick={handleDeleteTodo}
          title="Delete todo"
          className={styles.btnDel}
        >
          <DeleteForever />
        </IconButton>
      </ListItem>
    </>
  );
};

export default TodoItem;
