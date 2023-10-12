import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import React, { useEffect, useRef, useState } from 'react';
import getUserNotifications from '../../services/UserService';
import { MenuItem } from 'primereact/menuitem';



interface Notification {
    id: number
    userId: string
    message: string
    createdAt: number
    read: boolean
}


const UserNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Array<Notification>>([]);
    const [loading, setLoading] = useState(true);
    const menu = useRef<Menu | null>(null);

    const getNotifications = async () => {
        try {
            const responseNotifications = await getUserNotifications();
            setNotifications(responseNotifications);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    };

    useEffect(() => {
        getNotifications();
    }, [loading]);

    const notificationitems: MenuItem[] = notifications?.length == 0 ? [{ label: "Sin notificaciones" }]
        : (notifications.map((notification) => ({
            label: notification.message,
            icon: 'pi pi-bell', // Puedes cambiar el icono según tus necesidades
            command: () => {
            }
        })))
    let items = [
        ...notificationitems,
        {
            template: () => {
                return (
                    <div style={{ display: 'flex', alignContent: "column", justifyContent: "center" }}>
                        <Button style={{ height: '2rem' }} label="Recargar" icon={loading ? 'pi pi-refresh pi-spin' : 'pi pi-refresh'} onClick={refreshClick} />
                    </div>)
            }
        }
    ];
    const allItems: MenuItem[] = [{
        label: 'Notificaciones',
        items: items
    }]
    const refreshClick = () => {
        setLoading(true);


    };
    return (
        <div>
            <Menu model={allItems} popup ref={menu} style={{ width: '20rem' }} />
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
                    {!loading && notifications?.length != 0 && (<Badge value={notifications.length} severity="danger"></Badge>)}
                </i>
            </Button>

        </div>
    );
};

export default UserNotifications;