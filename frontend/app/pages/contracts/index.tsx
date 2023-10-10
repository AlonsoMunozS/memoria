import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';

const Contracts: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('authToken') == null) {
      router.push('/login');
    }
    else {
      setLoggedUser(true);
    }
  }, []);
  return (
    <div>
      {loggedUser && (
        <div>
          <Layout>
            <HomeBar />
          </Layout>
          <h1>Contratos</h1>
          <Button label="Boton de prueba" />
        </div>
      )}

    </div>
  );
};

export default Contracts;