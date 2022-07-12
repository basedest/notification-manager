import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ViewContext } from '../App'
import SelectBox from './SelectBox'

const GroupMenu = () => {
  const viewContext = useContext(ViewContext)
  const [users, setUsers] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [name, setName] = useState('')
  const loading = users === null
  const [cookies] = useCookies()

  useEffect(() => {
    fetch('http://localhost:5000/user', {
      headers: {
        Authorization: cookies.jwtToken
    },
    })
    .then(res => res.json())
    .then(data => {
      setUsers(data)
      setSelectedUsers([users[0]])
    })
  }, [])
  return (
    <Fragment>
      <header className='w-full bg-blue-500 py-6 rounded-b-lg'>
        <h1 className='text-center text-2xl font-bold text-white tracking-wide'>
          New Group
        </h1>
      </header>
      {
        loading
        ? <div>Loading...</div>
        :
        <div className='flex flex-col gap-4 py-8 px-10 sm:px-20 md:px-40 items-stretch min-h-screen'>
          
          <section>
            <label className='text-sm text-neutral-400 font-light'>
              Name
            </label>
              <input
                className='block w-full px-3 py-2 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300'
                type='text'
                onChange={e => setName(e.target.value)}
                placeholder='enter group name...'
              />
          </section>

          <section>
          <label className='text-sm text-neutral-400 font-light'>
            Select users
          </label>
          <SelectBox
            multiple
            selected={selectedUsers}
            setSelected={setSelectedUsers}
            source={users} 
          />
          </section>

          <section className='mt-4 flex justify-center gap-4'>
            <button 
              className='rounded-lg px-4 py-2 bg-blue-500 text-white text-lg transition hover:scale-105'
              onClick={() => {
                fetch('http://localhost:5000/group', 
                {
                  method: 'POST',
                  body: JSON.stringify({
                    name,
                    users: selectedUsers.map(user => user.id),
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: cookies.jwtToken
                  }
                })
                .then(res => res.json())
                .then(data => {
                  console.log(data)
                  viewContext.setCurrentView('main')
                })
              }}
              >
              Submit
            </button>
            <button 
              className='rounded-lg px-4 py-2 text-blue-500 border border-blue-500 text-lg transition hover:scale-105'
              onClick={() => viewContext.setCurrentView('main')}
            >
              Cancel
            </button>
          </section>
        </div>
      }
    </Fragment>
  )
}

export default GroupMenu