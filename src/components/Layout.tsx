import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-br from-[#090420] to-[#1A0E3B]">
      {children}
    </div>
  );
};

export default Layout;