import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';

const Admin: React.FC = () => {
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
                    <h1>Próximamente Administrador...</h1>
                </div>
            )}

        </div>
    );
};

export default Admin;