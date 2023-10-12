import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TableTenders from './components/TableTenders'
import { Tender } from './tender/models/Tender';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';
import { getTenders } from '../../services/TenderService';

const Tenders: React.FC = () => {
  const [tenders, setTenders] = useState<Array<Tender>>([]);
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState(false);
  const router = useRouter();

  const getTenderList = async () => {
    const responseTenders = await getTenders();
    setTenders(responseTenders);
    setLoading(false);
  }

  useEffect(() => {
    if (localStorage.getItem('authToken') == null) {
      router.push('/login');
    }
    else {
      setLoggedUser(true);
      getTenderList();
    }
  }, []);

  return (
    <div>
      {loggedUser && (
        <div>
          <Layout>
            <HomeBar />
          </Layout>
          <TableTenders tenders={tenders} loading={loading} setLoading={setLoading} ></TableTenders>
        </div>
      )}

    </div>

  );
};

export default Tenders;