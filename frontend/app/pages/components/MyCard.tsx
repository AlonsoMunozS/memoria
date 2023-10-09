import React from 'react';

type notification = {
    id: number
    userId: string
    message: string
    createdAt: number
    read: boolean
}

interface NotificationProps {
    notification: notification
}

const MyCard = ({ notification }: NotificationProps) => {
    const { id, userId, message, createdAt, read } = notification;
    return (
        <div className={`card2 ${read ? 'read' : 'unread'}`}>
            <div>
                <strong>Message:</strong> {message}
            </div>
            <div>
                <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
            </div>
            <div>
                <strong>Read:</strong> {read ? 'Yes' : 'No'}
            </div>
        </div>
    );
};

export default MyCard;