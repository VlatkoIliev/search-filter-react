import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
const URL = 'https://jsonplaceholder.typicode.com/users/:id ';

const UserDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data = await response.json();

        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        throw new Error('Something went wrong!');
      }
      setLoading(false);
    }
    getUser();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <p>No user to display</p>;
  } else {
    const street = user.address.street;
    const city = user.address.city;
    const fullname = user.name.split(' ');
    const FirstInit = fullname[0].charAt(0);
    const SecondInit = fullname[1].charAt(0);
    return (
      <div className='user-container'>
        <article className='details'>
          <div className='avatar'>{`${FirstInit} ${SecondInit}`}</div>
          <p>Username: {user.username}</p>
          <p>
            Email: <Link to=''>{user.email}</Link>
          </p>
          <p>Address: {`${street},${city}`}</p>
        </article>
        <p>
          <Link to='/' className='btn-back'>
            Back to Home page
          </Link>
        </p>
      </div>
    );
  }
};

export default UserDetails;
