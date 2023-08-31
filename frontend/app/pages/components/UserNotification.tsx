import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

const UserNotification: React.FC = () => {
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
                    className="p-button-rounded p-button-text"
                    style={{
                        outline: 'none',
                        boxShadow: 'none'
                    }}
                    onClick={(event) => menu.current?.toggle(event)}
                    aria-controls="popup_menu"
                    aria-haspopup
                >
                    <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.3rem' }}>
                        <Badge value="2" severity="danger"></Badge>
                    </i>
                </Button>

            </div>
        </div>
    );
};

export default UserNotification;
