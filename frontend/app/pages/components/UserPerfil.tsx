import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import React, { useRef } from 'react';

const UserPerfil: React.FC = () => {
    const menu = useRef<Menu | null>(null);
    const router = useRouter();
    const dataUser = localStorage.getItem('dataUser');
    const dataUserJson = JSON.parse(dataUser || '{}');
    const items = [
        {
            label: `¡Hola, ${dataUserJson.name}!`,
            items: [
                {
                    label: 'Ver perfil',
                    icon: 'pi pi-user-edit'
                },
                {
                    label: 'Panel de Administrador',
                    icon: 'pi pi-shield',
                    command: () => { router.push('/admin') },
                    visible: dataUserJson.role == 'Admin' ? true : false
                },
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        localStorage.clear();
                        router.push('/login');
                    }
                }
            ]
        }
    ];
    console.log("DataUser:", dataUserJson.email)
    return (
        <div>
            <div className="card">
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button
                    label={dataUserJson.name}
                    icon="pi pi-user"
                    className="p-button-rounded p-button-outlined fullbutton-resp"
                    onClick={(event) => menu.current?.toggle(event)}
                    aria-controls="popup_menu"
                    aria-haspopup
                />
                <Button
                    icon="pi pi-user"
                    className="p-button-rounded p-button-outlined smallbutton-resp"
                    onClick={(event) => menu.current?.toggle(event)}
                    aria-controls="popup_menu"
                    aria-haspopup
                />
            </div>
        </div>
    );
};

export default UserPerfil;
