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
            "currentStage": "publicación",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
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
            "currentStage": "publicación",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
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
            "currentStage": "publicación",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
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
            "currentStage": "publicación",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
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
            "currentStage": "publicación",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
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
            "currentStage": "publicación",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
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
            "currentStage": "publicación",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
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
            "currentStage": "publicación",
            "mercadoPublicoId": "Prueba1",
            "category": "Prueba1",
            "companies": undefined
          },
    ];

  return (
    <div>
      <Layout>
        <HomeBar/>
      </Layout>
      <TableTenders Tenders = {tenders} ></TableTenders>
    </div>
  );
};

export default Tenders;