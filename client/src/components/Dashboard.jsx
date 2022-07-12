import React, { useContext } from 'react'
import { ViewContext } from '../App'

const Dashboard = () => {
    const viewContext = useContext(ViewContext)
    const DashboardButton = ({children, ...props}) => (
        <button
            {...props} 
            className='
            w-full bg-blue-500 py-4 text-white rounded-lg 
            text-xl font-medium leading-8 tracking-wide
            hover:bg-white hover:border-4 transition-all hover:scale-105 hover:border-blue-500 hover:text-blue-500
        '>
            {children}
        </button>
    )
    return (
    <div className='flex flex-col gap-4 py-4 px-6'>
        <DashboardButton onClick={() => viewContext.setCurrentView('newNotification')}>
            New notification
        </DashboardButton>

        <DashboardButton onClick={() => viewContext.setCurrentView('newGroup')}>
            New group
        </DashboardButton>

        <DashboardButton onClick={() => viewContext.setCurrentView('groupView')}>
            Browse groups
        </DashboardButton>
    </div>
    )
}

export default Dashboard