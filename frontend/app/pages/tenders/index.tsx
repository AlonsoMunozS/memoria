import React, { useState, useEffect } from 'react';
import TableTenders from './components/TableTenders'
import { Tender } from './tender/models/Tender';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';
import { ProgressSpinner } from 'primereact/progressspinner';
import InfoMessage from '../components/InfoMessage';

const Tenders: React.FC = () => {
  const [tenders, setTenders] = useState<Array<Tender>>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<"success" | "info" | "warn" | "error" | undefined>();
  const [message, setMessage] = useState<string | undefined>();

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/tenders/'); // Cambia la URL por tu API
      const jsonData = await response.json();
      setTenders(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {type && message && (
        <div className='p-toast'>
          <InfoMessage type={type} message={message} setType={setType} setMessage={setMessage} />
        </div>
      )}
      <Layout>
        <HomeBar />
      </Layout>
      <TableTenders tenders={tenders} setLoading={setLoading} setType={setType} setMessage={setMessage} ></TableTenders>
      {loading && (
        <div className="spinner-container">
          <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
      )}
    </div>

  );
};

export default Tenders;