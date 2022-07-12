import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ViewContext } from '../App'
import SelectBox from './SelectBox'

const NotificationMenu = () => {
  const [users, setUsers] = useState(null)
  const [groups, setGroups] = useState(null)
  const [type, setType] = useState({ id: 1, name: 'everyone' })
  const [user, setUser] = useState()
  const [group, setGroup] = useState()
  const [content, setContent] = useState('')
  const viewContext = useContext(ViewContext)
  const [cookies] = useCookies()
  const loading = users === null || groups === null

  useEffect(() => {
    fetch('http://localhost:5000/group',{
      headers: {Authorization: cookies.jwtToken}
    })
    .then(res => res.json())
    .then(data => {
      setGroups(data)
      setGroup(data[0])
    })
    fetch('http://localhost:5000/user',{
      headers: {Authorization: cookies.jwtToken}
    })
    .then(res => res.json())
    .then(data => {
      setUsers(data)
      setUser(data[0])
    })
  }, [])

  const types = [
    {id:1, name: 'everyone'},
    {id:2, name: 'group'},
    {id:3, name: 'user'},
  ]

  return (
    <Fragment>
      <header className='w-full bg-blue-500 py-6 rounded-b-lg'>
        <h1 className='text-center text-2xl font-bold text-white tracking-wide'>
          New Notification
        </h1>
      </header>
      {
        loading
        ?
        <div>Loading...</div>
        :
        <div className='flex flex-col gap-4 py-8 px-10 sm:px-20 md:px-40 items-stretch min-h-screen'>
          <section>
            <label className='text-sm text-neutral-400 font-light'>Type</label>
            <SelectBox selected={type} setSelected={setType} source={types} />
          </section>

          {
            type.name !== 'everyone' &&
            <section>
            <label className='text-sm text-neutral-400 font-light'>
              {
                type.name === 'group' ? 'Group' : 'User'
              }
            </label>
            <SelectBox
              selected={type.name === 'group' ? group : user}
              setSelected={type.name === 'group' ? setGroup : setUser}
              source={type.name === 'group' ? groups : users} 
            />
            </section>
          }

          <section>
            <label className='text-sm text-neutral-400 font-light'>Content</label>
            <div className='flex justify-center'>
              <textarea 
                className='rounded border border-neutral-400 p-3 focus:outline-none focus:border-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300' cols='100'
                onChange={e => setContent(e.target.value)}
                >
              </textarea>
            </div>
          </section>

          <section className='mt-4 flex justify-center gap-4'>
            <button 
              className='rounded-lg px-4 py-2 bg-blue-500 text-white text-lg transition hover:scale-105'
              onClick={() => {
                fetch('http://localhost:5000/notification', 
                {
                  method: 'POST',
                  body: JSON.stringify({
                    type: type.name,
                    group: type.name === 'group' ? group.id : undefined,
                    user_id: type.name === 'user' ? user.id : undefined,
                    content
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

export default NotificationMenu