import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HomeBar from './components/HomeBar'
import Layout from './components/Layout';

const HomePage = () => {
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
        </div>
      )}

    </div>
  );
};

export default HomePage;