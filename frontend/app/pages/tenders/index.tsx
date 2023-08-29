import React from 'react';
import TableTenders from './components/TableTenders'
import { Button } from 'primereact/button';
import { Tender } from './tender/models/Tender';
import Layout from '../components/Layout';

const Tenders : React.FC = () => {
    const tenders: Array<Tender> = [
        {
            "id": 442202,
            "name": "Prueba1",
            "safi": "Prueba1",
            "province": "Prueba1",
            "commune": "Prueba1",
            "address": "Prueba1",
            "location": {
              "longitude": 10,
              "latitude": 0
            },
            "createdAt": 1692593265092,
            "createdBy": 13452377,
            "currentStage": "FirstStage",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
    ];

  return (
    <Layout>
      <div>
        <h1>Licitaciones</h1>
        <Button label="Boton de prueba" />
        <TableTenders Tenders = {tenders} ></TableTenders>
      </div>
    </Layout>
  );
};

export default Tenders;