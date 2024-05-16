import { Routes, Route, Outlet, Link } from "react-router-dom";
import { CheckName } from './pages/CheckName';
import { Home } from './pages/Home';
import './App.css';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="check-name" element={<CheckName />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
  );
}

function Layout() {
  return (
    <div className="App-header">
      <nav>
        <ul>
          <li>
            <Link className="App-link" to="/">Home</Link>
          </li>
          <li>
            <Link className="App-link" to="/check-name">Check Name</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}