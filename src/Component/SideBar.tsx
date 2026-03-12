import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h3 className="sidebar__brand">SwiftCash</h3>

      <ul className="sidebar__nav">
        <li className="sidebar__item">
          <NavLink to="/" end className={({ isActive }) =>
            `sidebar__link${isActive ? " active" : ""}`
          }>
            Dashboard
          </NavLink>
        </li>

        <li className="sidebar__item">
          <NavLink to="/transactions" className={({ isActive }) =>
            `sidebar__link${isActive ? " active" : ""}`
          }>
            Transactions
          </NavLink>
        </li>

        <li className="sidebar__item">
          <NavLink to="/transactions/add" className={({ isActive }) =>
            `sidebar__link${isActive ? " active" : ""}`
          }>
            Add Transaction
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;