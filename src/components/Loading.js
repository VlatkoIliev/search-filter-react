import React from 'react';
import loadingGif from '../loading-arrow.gif';

const Loading = () => {
  return (
    <div className='loading'>
      <h4>Data loading...</h4>
      <img src={loadingGif} />
    </div>
  );
};
export default Loading;
