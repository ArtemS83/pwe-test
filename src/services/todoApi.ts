import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/todos';

interface INewTodo {
  description: string;
}

interface ITodoStatus {
  isDone: boolean;
}

const getTodos = () => {
  return axios
    .get('/')
    .then(({ data }) => data)
    .catch(error => console.log('error', error));
};

const deleteTodo = (id: string) => {
  axios.delete(`/${id}`).catch(error => console.log('error', error));
};

const addTodo = (newTodo: INewTodo) => {
  return axios
    .post('/', newTodo)
    .then(({ data }) => data)
    .catch(error => console.log('error', error));
};

const updateTodo = (id: string, body: ITodoStatus) => {
  return axios
    .patch(`/${id}/status`, body)
    .then(({ data }) => data)
    .catch(error => console.log('error', error));
};

export default { getTodos, deleteTodo, addTodo, updateTodo };
