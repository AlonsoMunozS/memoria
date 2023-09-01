import React, {useState, useEffect} from 'react';
import TableTenders from './components/TableTenders'
import { Tender } from './tender/models/Tender';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';

const Tenders : React.FC = () => {
  const [tenders, setTenders] = useState<Array<Tender>>([]);
  const [loading, setLoading] = useState(true);

<<<<<<< Updated upstream
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data'); // Cambia la URL por tu API
        const jsonData = await response.json();
        setTenders(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
=======
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/tenders/'); // Cambia la URL por tu API
      const jsonData = await response.json();
      setTenders(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <TableTenders Tenders = {tenders} ></TableTenders>
=======
      <TableTenders tenders = {tenders} loading = {loading} ></TableTenders>
>>>>>>> Stashed changes
    </div>
  );
};

export default Tenders;