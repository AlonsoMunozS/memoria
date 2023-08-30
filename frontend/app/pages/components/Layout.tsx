// components/Layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
      {/* Otros elementos de la interfaz común */}
    </div>
  );
};

export default Layout;
