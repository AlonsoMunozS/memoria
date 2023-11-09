import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import HomeBar from '../components/HomeBar';
import { getUsers } from '../../services/UserService';
import TableUsers from './components/TableUsers';

type User = {
    id: string,
    name: string,
    rut: string,
    email: string,
    userPermits: {
        tenders?: {
            create: boolean,
            remove: boolean,
            update: boolean,
            read: boolean
        },
        contracts?: {
            create: boolean,
            remove: boolean,
            update: boolean,
            read: boolean
        }
    },
    role: string
}

const Admin: React.FC = () => {
    const [loggedUser, setLoggedUser] = useState(false);
    const [users, setUsers] = useState<Array<User>>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getUserList = async () => {
        const responseUsers = await getUsers();
        setUsers(responseUsers);
        setLoading(false);
    }

    useEffect(() => {
        if (localStorage.getItem('authToken') == null) {
            router.push('/login');
        }
        else {
            setLoggedUser(true);
            setLoading(true);
            getUserList();
        }
    }, []);

    return (
        <div>
            {loggedUser && (
                <div>
                    <Layout>
                        <HomeBar />
                    </Layout>
                    <TableUsers users={users} loading={loading} setLoading={setLoading} setUsers={setUsers} />
                </div>
            )}

        </div>
    );
};

export default Admin;