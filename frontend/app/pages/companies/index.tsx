import React from 'react';
import { Button } from 'primereact/button';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';

const Companies : React.FC = () =>  {
  return (
    <div>
      <Layout>
        <HomeBar/>
      </Layout>
      
      <h1>Empresas</h1>
      <Button label="Boton de prueba" />
      </div>
  );
};

export default Companies;