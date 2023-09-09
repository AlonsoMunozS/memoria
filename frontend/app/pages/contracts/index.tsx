import React from 'react';
import { Button } from 'primereact/button';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';

const Contracts : React.FC = () =>  {
  return (
    <div>
      <Layout>
        <HomeBar/>
      </Layout>
      <h1>Contratos</h1>
      <Button label="Boton de prueba" />
    </div>
  );
};

export default Contracts;