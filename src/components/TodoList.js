import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import Loading from './Loading';
import SearchFilter from './SearchFilter';
const URL = 'https://jsonplaceholder.typicode.com/todos';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('All Todos');

  const fetchData = () => {
    setLoading(true);
    setError(false);
    axios
      .get(URL)
      .then((response) => {
        const todos = response.data;
        setTodoList(todos);
        setLoading(false);
      })
      .catch((error) => setError(true));
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       setError(false);
  //       try {
  //         const result = await fetch(URL);
  //         const data = await result.json();
  //         setTodoList(data);
  //       } catch (error) {
  //         setError(true);
  //       }
  //       setLoading(false);
  //     };
  //     fetchData();
  //   }, []);

  // funkcija za filtriranje na todo list

  const handleToggle = (id) => {
    const filtered = [...todoList];
    const item = filtered.find((item) => item.id === id);
    item.completed = !item.completed;
    setTodoList(filtered);
  };

  const handleDelete = (id) => {
    const arr = todoList.filter((item) => item.id !== id);
    setTodoList(arr);
  };

  const searchbarFilterItems = () => {
    return todoList.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const handleFilter = (e) => {
    const filterTerm = e.target.value;
    setFilterBy(filterTerm);
    console.log(todoList);
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterList = (todoList) => {
    if (filterBy === 'All Todos') {
      return todoList;
    } else if (filterBy === 'Completed Todos') {
      return todoList.filter((todo) => todo.completed);
    } else if (filterBy === 'Pending Todos') {
      return todoList.filter((todo) => !todo.completed);
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Something is not right</p>;
  }

  if (todoList.length === 0) {
    return (
      <div className='load'>
        <h3>Empty todo list</h3>
        <button onClick={fetchData} className='btn-primary btn-load'>
          Load list
        </button>
      </div>
    );
  }
  const filteredSearch = searchbarFilterItems();
  const filteredDropDown = filterList(filteredSearch);
  return (
    <>
      <SearchFilter
        filterBy={filterBy}
        handleInput={handleInput}
        handleFilter={handleFilter}
      />

      <div className='list'>
        <div className='btn-holder'>
          <button
            onClick={() => setTodoList([])}
            className='btn-delete btn-clear'
          >
            Clear todo list
          </button>
        </div>
        <ul>
          {filteredDropDown.map((item) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
