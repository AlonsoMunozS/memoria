// components/HomeBar.tsx
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useRouter } from 'next/router';
import UserPerfil from './UserPerfil';
import UserNotifications from './UserNotifications';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

const HomeBar: React.FC = () => {
  const router = useRouter();

  const items = [
    { label: 'Licitaciones', link: '/tenders', command: () => { router.push('/tenders') } },
    { label: 'Contratos en ejecución', link: '/contracts', command: () => { router.push('/contracts') } },
    { label: 'Empresas', link: '/companies', command: () => { router.push('/companies') } },
  ];

  const activeIndex = items.findIndex((item) => item.link === router.pathname);

  return (
    <div style={{ height: '58px', display: 'flex', justifyContent: 'space-between', gap: '2rem', borderBottom: '1px solid #d8d6d6' }}>
      <div className='tabmenu-resp'>
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => router.push(items[e.index].link)}
        />
      </div>
      <Menubar className='menubar-resp' model={items} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
        <UserNotifications />
        <UserPerfil />
      </div>
    </div>
  );
};

export default HomeBar;
