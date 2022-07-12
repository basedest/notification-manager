import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const GroupElement = ({group, handleDelete}) => {
    const [opened, setOpened] = useState(false)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [cookies] = useCookies()
    
    return (
        
        <Disclosure>
        {({ open }) => (
            <>
            <Disclosure.Button 
                onClick={() => {
                    setOpened(true)
                    if (!opened) {
                        fetch(`http://localhost:5000/group/${group.id}`, {
                            headers: {
                                Authorization: cookies.jwtToken
                            },
                        })
                        .then(res => res.json())
                        .then(data => {
                            setUsers(data.users)
                            setLoading(false)
                        })
                    }
                }} 
                className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>{group.name}</span>
                <ChevronUpIcon
                className={`${
                    open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-blue-500`}
                />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 py-2 text-blue-900">
                {
                    !loading && users.map(user => <div key={user.user_id}>{user.name}</div>)
                }
                {
                    users.length === 0 && <div className='text-gray-500'>no users</div>
                }
                <button
                    onClick={() => handleDelete(group.id)}
                    className='mt-2 px-2 py-1 rounded-md border border-red-600 text-red-600 transition-all hover:bg-red-600 hover:text-white hover:scale-105'
                >
                    delete
                </button>
            </Disclosure.Panel>
            </>
        )}
        </Disclosure>

        
    )
}

export default GroupElement