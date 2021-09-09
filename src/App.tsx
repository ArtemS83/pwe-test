import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import TodoList from './components/TodoList/TodoList';
import apiServices from './services/todoApi';

interface INewTodo {
  description: string;
}

interface ITodo {
  id: string;
  description: string;
  isDone: boolean;
}

interface ITodoStatus {
  isDone: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [toggleChecked, setToggleChecked] = useState<boolean>(false);

  useEffect(() => {
    apiServices.getTodos().then(({ data }) => setTodos(data.todos));
  }, []);

  const addTodoHandler = async (text: string) => {
    const newTodo: INewTodo = {
      description: text,
    };
    await apiServices
      .addTodo(newTodo)
      .then(({ data }) => setTodos(prevTodos => [data.newTodo, ...prevTodos]));
  };

  const toggleCompletedHandler = async (todoId: string, body: ITodoStatus) => {
    await setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
    await apiServices.updateTodo(todoId, body);
    setToggleChecked(true);
  };

  useEffect(() => {
    if (toggleChecked) {
      const idDoneTodos = todos.filter(({ isDone }) => isDone);
      console.log('All completed todos', idDoneTodos);
      setToggleChecked(false);
    }
  }, [toggleCompletedHandler]);

  const deleteTodoHandler = async (todoId: string) => {
    await setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    await apiServices.deleteTodo(todoId);
  };

  return (
    <Container>
      <AddTodoForm onSubmit={addTodoHandler} />
      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodoHandler}
        onToggleCompleted={toggleCompletedHandler}
      />
    </Container>
  );
};

export default App;
