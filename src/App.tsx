import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import TodoList from './components/TodoList/TodoList';
import SortButtons from './components/SortButtons/SortButtons';
import apiServices from './services/todoApi';
import { ITodo, INewTodo, ITodoStatus } from './interfaces/Todo.interface';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const [toggleChecked, setToggleChecked] = useState<boolean>(false);

  const [showTodos, setShowTodos] = useState<ITodo[]>([]);

  const [sortBy, setSortBys] = useState<string>('all');

  useEffect(() => {
    apiServices.getTodos().then(({ data }) => {
      setTodos(data.todos), setShowTodos(data.todos);
    });
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

  useEffect(() => {
    if (sortBy === 'all') {
      setShowTodos(todos);
    }
    if (sortBy === 'completed') {
      setShowTodos(CompletedTodos);
    }
    if (sortBy === 'notCompleted') {
      setShowTodos(NotCompletedTodos);
    }
  }, [todos, sortBy]);

  const CompletedTodos = todos.filter(({ isDone }) => isDone);
  const NotCompletedTodos = todos.filter(({ isDone }) => !isDone);

  const allTodosQuantity = todos.length;
  const completedTodosQuantity = todos.filter(({ isDone }) => isDone).length;
  const notCompletedTodosQuantity = todos.filter(
    ({ isDone }) => !isDone,
  ).length;

  const groupOfTodosForButtons = {
    allTodosQuantity,
    completedTodosQuantity,
    notCompletedTodosQuantity,
  };

  const chooseCompletedHandler = async (value: string | null) => {
    switch (value) {
      case 'all':
        setSortBys(value);
        setShowTodos(todos);
        return;
      case 'completed':
        setSortBys(value);
        setShowTodos(CompletedTodos);
        return;
      case 'notCompleted':
        setSortBys(value);
        setShowTodos(NotCompletedTodos);
        return;
      default:
        return;
    }
  };

  return (
    <Container>
      <AddTodoForm onSubmit={addTodoHandler} />
      <SortButtons
        todosItems={groupOfTodosForButtons}
        onClickBySort={chooseCompletedHandler}
      />
      <TodoList
        todos={showTodos}
        onDeleteTodo={deleteTodoHandler}
        onToggleCompleted={toggleCompletedHandler}
      />
    </Container>
  );
};

export default App;
