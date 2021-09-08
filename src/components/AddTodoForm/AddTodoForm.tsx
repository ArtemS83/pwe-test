import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import styles from './AddTodoForm.module.scss';

interface ITodoFormProps {
  onSubmit(text: string): void;
}

const AddTodoForm: React.FC<ITodoFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handelForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim().length === 0) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form
      className={styles.addTodoForm}
      onSubmit={handelForm}
      autoComplete="off"
    >
      <TextField
        type="text"
        name="text"
        value={text}
        onChange={changeHandler}
        label="Enter Todo"
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<AddIcon>add</AddIcon>}
      >
        Add todo
      </Button>
    </form>
  );
};

export default AddTodoForm;
