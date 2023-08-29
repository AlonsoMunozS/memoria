// components/HomeBar.tsx
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useRouter } from 'next/router';

const HomeBar: React.FC = () => {
  const router = useRouter();

  const items = [
    { label: 'Licitaciones', icon: 'pi pi-fw pi-list', link: '/tenders' },
    { label: 'Contratos en ejecución', icon: 'pi pi-fw pi-list', link: '/contracts' },
    { label: 'Empresas', icon: 'pi pi-fw pi-list', link: '/companies' },
  ];

  const activeIndex = items.findIndex((item) => item.link === router.pathname);

  return (
    <div>
      <div className="card">
        <TabMenu
          model={items.map((item) => ({ label: item.label, icon: item.icon }))}
          activeIndex={activeIndex}
          onTabChange={(e) => router.push(items[e.index].link)}
        />
      </div>
    </div>
  );
};

export default HomeBar;
