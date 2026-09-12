import { NavLink, Outlet } from "react-router";

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink aria-label="Project Atlas home" className="brand" to="/projects">
          <span>PA</span>
          <strong>Project Atlas</strong>
        </NavLink>
        <nav aria-label="Primary navigation">
          <NavLink to="/projects">Portfolio</NavLink>
          <a href="#delivery">Delivery</a>
          <a href="#teams">Teams</a>
        </nav>
        <div aria-label="Signed in user" className="avatar">
          SK
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <span>Project Atlas</span>
        <span>Reliable delivery at a glance</span>
      </footer>
    </div>
  );
}
