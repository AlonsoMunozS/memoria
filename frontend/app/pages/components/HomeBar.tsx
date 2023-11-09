// components/HomeBar.tsx
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useRouter } from 'next/router';
import UserPerfil from './UserPerfil';
import UserNotification from './UserNotification';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

const HomeBar: React.FC = () => {
  const router = useRouter();
  const dataUser = localStorage.getItem('dataUser');
  const dataUserJson = JSON.parse(dataUser || '{}');

  const items = [
    { label: 'Licitaciones', link: '/tenders', command: () => { router.push('/tenders') }, disabled: dataUserJson.userPermits == null ? true : dataUserJson.userPermits?.tenders == undefined ? true : false },
    { label: 'Contratos en ejecución', link: '/contracts', command: () => { router.push('/contracts') }, disabled: dataUserJson.userPermits == null ? true : dataUserJson.userPermits?.contracts == undefined ? true : false },
    { label: 'Empresas', link: '/companies', command: () => { router.push('/companies') }, disabled: dataUserJson.userPermits == null ? true : dataUserJson.userPermits?.companies == undefined ? true : false },
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
        <UserNotification />
        <UserPerfil />
      </div>
    </div>
  );
};

export default HomeBar;
