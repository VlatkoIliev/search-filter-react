import React from 'react';
import { useNavigate } from 'react-router-dom';

const TodoItem = ({ item, handleDelete, handleToggle }) => {
  const { id, userId, title } = item;

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/users/${userId}`;
    navigate(path);
  };

  return (
    <div>
      <li className='list-item' onClick={routeChange}>
        <p className='title'>{title}</p>

        <div className='btn-container'>
          <div className='btns'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}
              className='btn-delete'
            >
              Delete
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(id);
              }}
              className='btn-primary btn-toggle'
            >
              Toggle
            </button>
          </div>
          <div className='item-status'>
            {item.completed ? (
              <span>completed&#10003;</span>
            ) : (
              <span> pending</span>
            )}
          </div>
        </div>
      </li>
    </div>
  );
};

export default TodoItem;
