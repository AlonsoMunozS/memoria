// components/Layout.tsx
import React, { ReactNode } from 'react';
import HomeBar from './HomeBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <HomeBar />
      <div>{children}</div>
      {/* Otros elementos de la interfaz común */}
    </div>
  );
};

export default Layout;
