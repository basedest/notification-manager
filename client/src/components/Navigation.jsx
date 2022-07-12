import { Tab } from '@headlessui/react'
import { useCookies } from 'react-cookie'
import Dashboard from './Dashboard'
import NotificationList from './NotificationList'

const selectedClasses = 
'bg-blue-500 text-white p-2 border border-blue-500 w-full rounded text-lg font-bold focus:ring-2 focus:outline-none focus:ring-blue-300'
const deselectedClasses =
'bg-white text-blue-500 p-2 border border-blue-300 w-full rounded text-lg font-bold' 

const Navigation = () => {
  const [cookies] = useCookies()
  return (
    <Tab.Group>
      <Tab.List
        as='nav'
        className='flex p-2 gap-1 bg-blue-100 rounded-b-lg shadow-inner'
      >
        <Tab as='button' className={({ selected }) => selected ? selectedClasses : deselectedClasses}>
          Unreads
        </Tab>
        <Tab as='button' className={({ selected }) => selected ? selectedClasses : deselectedClasses}>
          All
        </Tab>
        {
          cookies.role === 'admin' &&
          <Tab as='button' className={({ selected }) => selected ? selectedClasses : deselectedClasses}>
          Dashboard
          </Tab>
        }
      </Tab.List>
      <Tab.Panels as='section' className='p-2'>
        <Tab.Panel>
          <NotificationList unread={true} />
        </Tab.Panel>

        <Tab.Panel>
          <NotificationList />
        </Tab.Panel>

        <Tab.Panel>
          <Dashboard />
        </Tab.Panel>

      </Tab.Panels>
    </Tab.Group>
  )
}

export default Navigation