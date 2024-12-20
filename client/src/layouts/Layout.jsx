import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="flex h-screen bg-background text-foreground overflow-hidden">
      <Outlet />
    </main>
  );
};

export default Layout;
