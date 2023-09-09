// components/HomeBar.tsx
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useRouter } from 'next/router';
import UserPerfil from './UserPerfil';
import UserNotification from './UserNotification';

const HomeBar: React.FC = () => {
  const router = useRouter();

  const items = [
    { label: 'Licitaciones', link: '/tenders' },
    { label: 'Contratos en ejecución', link: '/tenders' },
    { label: 'Empresas', link: '/tenders' },
  ];

  const activeIndex = items.findIndex((item) => item.link === router.pathname);

  return (
    <div style={{display: 'flex',justifyContent:'space-between',gap:'2rem',borderBottom: '1px solid #d8d6d6'}}>
      <TabMenu
        model={items.map((item) => ({ label: item.label }))}
        activeIndex={activeIndex}
        onTabChange={(e) => router.push(items[e.index].link)}
      />
      <div style={{display: 'flex',justifyContent:'space-between',gap:'0.5rem'}}>
        <UserNotification/>
        <UserPerfil/>
      </div>
    </div>
  );
};

export default HomeBar;
