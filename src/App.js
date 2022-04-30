import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import UserDetails from './pages/UserDetails';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/:id' element={<UserDetails />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
