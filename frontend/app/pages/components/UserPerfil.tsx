import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

const UserPerfil: React.FC = () => {
    const menu = useRef<Menu | null>(null);
    const toast = useRef<Toast | null>(null);
    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times'
                }
            ]
        }
    ];

    return (
        <div>
            <Toast ref={toast}></Toast>
            <div className="card">
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button
                    label="Usuario"
                    icon="pi pi-user"
                    className="p-button-rounded p-button-outlined"
                    onClick={(event) => menu.current?.toggle(event)}
                    aria-controls="popup_menu"
                    aria-haspopup
                />
            </div>
        </div>
    );
};

export default UserPerfil;