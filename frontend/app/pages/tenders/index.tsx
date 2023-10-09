import React, { useState, useEffect } from 'react';
import TableTenders from './components/TableTenders'
import { Tender } from './tender/models/Tender';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';
import { getTenders } from '../services/TenderService';

const Tenders: React.FC = () => {
  const [tenders, setTenders] = useState<Array<Tender>>([]);
  const [loading, setLoading] = useState(true);

  const getTenderList = async () => {
    const responseTenders = await getTenders();
    setTenders(responseTenders);
    setLoading(false);
  }

  useEffect(() => {
    getTenderList();
  }, []);

  return (
    <div>
      <Layout>
        <HomeBar />
      </Layout>
      <TableTenders tenders={tenders} loading={loading} setLoading={setLoading} ></TableTenders>
    </div>

  );
};

export default Tenders;