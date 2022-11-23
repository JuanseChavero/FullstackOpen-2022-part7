import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import { Blogs } from './components/Blogs';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { Navbar } from './components/Navbar';
import Notification from './components/Notification';
import { User } from './components/User';
import { Users } from './components/Users';
import { fetchBlogs } from './library/reducers/blogReducer';
import {
  addTokenForServices,
  setUser,
} from './library/reducers/loggedUserReducer';
import { fetchUsers } from './library/reducers/userReducer';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const message = useSelector((state) => state.notification.message);
  const location = useLocation();

  useEffect(() => {
    const isGoingToLogin = location.pathname === '/login';
    const loggedUser = JSON.parse(
      window.localStorage.getItem('loggedBlogAppUser'),
    );

    // IF the user is not logged in and it's trying to go anywhere that
    // isn't login, then redirect him to the login page
    if (!loggedUser && !isGoingToLogin) navigate('/login');

    // IF the user is logged in and it's trying to go to login, then
    // redirect him to the home page
    if (loggedUser && isGoingToLogin) navigate('/');

    if (loggedUser) {
      dispatch(setUser(loggedUser));
      addTokenForServices(loggedUser);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    dispatch(fetchBlogs());
    dispatch(fetchUsers());
  }, [user]);

  return (
    <Container>
      <Notification message={message} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/new" element={<BlogForm />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Container>
  );
};

export default App;
