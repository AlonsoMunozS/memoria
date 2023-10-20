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
          <img style={{ width: "100%", position: 'absolute' }} src="https://firebasestorage.googleapis.com/v0/b/memoria-9bc6e.appspot.com/o/Home.jpg?alt=media&token=73939307-ad60-48d8-b721-eda7f8cc79c0&_gl=1*a83g0p*_ga*MjgxMTgwNzcwLjE2OTI4NTEyNjk.*_ga_CW55HF8NVT*MTY5NzgyMjczMC41OS4xLjE2OTc4MjI3MzUuNTUuMC4w" />
        </div>
      )}
    </div>
  );
};

export default HomePage;