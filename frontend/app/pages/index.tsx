import React, { useEffect } from 'react';
import HomeBar from './components/HomeBar'
import Layout from './components/Layout';
import { useRouter } from 'next/router';

const HomePage = () => {

  return (
    <div>
      <Layout>
        <HomeBar />
      </Layout>
    </div>
  );
};

export default HomePage;