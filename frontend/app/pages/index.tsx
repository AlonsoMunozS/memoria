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
          <img style={{ width: "50%", position: 'absolute' }} src="https://firebasestorage.googleapis.com/v0/b/memoria-9bc6e.appspot.com/o/background.png?alt=media&token=2ac52401-7c1f-4181-8718-8673f5d1ba7e&_gl=1*1fgmiad*_ga*MjgxMTgwNzcwLjE2OTI4NTEyNjk.*_ga_CW55HF8NVT*MTY5OTM4MzUzNS42Ni4xLjE2OTkzODQ0NTEuMy4wLjA." />
        </div>
      )}
    </div>
  );
};

export default HomePage;