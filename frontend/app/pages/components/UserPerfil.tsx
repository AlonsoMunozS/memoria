import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import React, { useRef } from 'react';

const UserPerfil: React.FC = () => {
    const menu = useRef<Menu | null>(null);
    const router = useRouter();
    const items = [
        {
            label: '¡Hola, Admin!',
            items: [
                {
                    label: 'Ver perfil',
                    icon: 'pi pi-user-edit'
                },
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        localStorage.removeItem('authToken');
                        router.push('/login');
                    }
                }
            ]
        }
    ];

    return (
        <div>
            <div className="card">
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button
                    label="Admin"
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
