import React, {useState, useEffect} from 'react';
import TableTenders from './components/TableTenders'
import { Tender } from './tender/models/Tender';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';

const Tenders : React.FC = () => {
  const [tenders, setTenders] = useState<Array<Tender>>([]);
  const [loading, setLoading] = useState(true);

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
      <Layout>
        <HomeBar/>
      </Layout>
      <TableTenders tenders = {tenders} loading = {loading} ></TableTenders>
    </div>
  );
};

export default Tenders;