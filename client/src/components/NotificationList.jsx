import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Notification from './Notification'

const NotificationList = ({unread}) => {
    const [notifications, setNotifications] = useState([])
    const [cookies] = useCookies()
    const fetchData = () => {
        fetch(`http://localhost:5000/user/notifications/${unread ? '?unreads=true' : ''}`,{
            headers: {
                Authorization: cookies.jwtToken
            }
        })
        .then(res => res.json())
        .then(data => {setNotifications(data)})
    }
    const handleRead = id => {
        console.log(cookies.jwtToken)
        fetch(`http://localhost:5000/notification/${id}`,{
            headers: {
                Authorization: cookies.jwtToken
            },
            method: 'PATCH'
        })
        .then(res => {
            if (res.status < 300) {
                setNotifications(notifications.filter(notification => notification.id !== id))
            }
        })
    }
    useEffect(() => {
        fetchData()
        if (unread) setInterval(() => {
            fetchData()
        }, 5000)
    }, [unread])
    
    return (
        <>
            {
                notifications.length > 0
                ?
                notifications.map(item => <Notification
                    key={item.id}
                    data={item}
                    handleRead={handleRead}
                    readButton={unread}
                />)
                :
                <div className='flex justify-center mt-8 text-xl'>You don't have any notifications yet</div>
            }
        </>
    )
}

export default NotificationList