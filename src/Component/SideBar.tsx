import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav style={{ width: "200px", padding: "20px", borderRight: "1px solid #ccc" }}>
      <h3>SwiftCash</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/transactions">
            Transactions
          </NavLink>
        </li>

        <li>
          <NavLink to="/transactions/add">
            Add Transaction
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;