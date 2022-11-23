import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <NavLink to="/">Anecdotes</NavLink>
      <NavLink to="/create">Create new</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  );
};

export default Menu;
