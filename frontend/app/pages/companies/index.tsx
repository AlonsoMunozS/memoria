import React from 'react';
import { Button } from 'primereact/button';
import Layout from '../components/Layout';

const Companies : React.FC = () =>  {
  return (
    <Layout>
      <div>
        <h1>Empresas</h1>
        <Button label="Boton de prueba" />
    </div>
    </Layout>
  );
};

export default Companies;