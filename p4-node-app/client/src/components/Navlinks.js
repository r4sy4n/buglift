import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const Navlinks = (close) => {
  const handleLinkClick = () => {
    if (typeof close.toggle === 'function') {
      close.toggle();
    }
  }
  const role = localStorage.getItem('role');
  return (
    <div className='nav-links'>
      {links.filter((link) => {
        if (role === 'admin') {
          return link.text.toLowerCase() !== 'user profile';
        } else if (role === 'user') {
          return link.text.toLowerCase() !== 'admin';
        } else {
          return link.text.toLowerCase() !== 'admin';
          // return true; // Include all other links when role is not 'admin' or 'user'
        }
      }).map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={handleLinkClick}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  )
}

export default Navlinks;