import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ViewContext } from '../App'
import GroupElement from './GroupElement'

const GroupViewer = () => {
  const viewContext = useContext(ViewContext)
  const [groups, setGroups] = useState([])
  const loading = groups === null
  const [cookies] = useCookies() 
  useEffect(() => {
    fetch('http://localhost:5000/group', {
      headers: {Authorization: cookies.jwtToken}
    })
    .then(res => res.json())
    .then(data => {
      setGroups(data)
    })
  }, [])

  const handleDelete = id => {
    fetch(`http://localhost:5000/group/${id}`, 
      {
        method: 'DELETE',
        headers: {Authorization: cookies.jwtToken}
      })
      .then(res => {
        if (res.status < 300) {
          setGroups(groups.filter(group => group.id !== id))
        }
      })
  }

  return (
    <Fragment>
      <header className='w-full bg-blue-500 py-6 rounded-b-lg'>
        <h1 className='text-center text-2xl font-bold text-white tracking-wide'>
          Group viewer
        </h1>
      </header>
      {
        loading
        ? <div>Loading...</div>
        :
        <div className='flex flex-col gap-4 py-8 px-10 sm:px-20 md:px-40 items-stretch min-h-screen'>
          
          <section className='flex flex-col gap-4'>
          {
            groups.map(group => <GroupElement key={group.id} group={group} handleDelete={handleDelete} />)
          }
          </section>

          <section className='mt-4 flex justify-center'>
            <button 
              className='rounded-lg px-4 py-2 text-blue-500 border border-blue-500 text-lg transition hover:bg-blue-500 hover:text-white hover:scale-105'
              onClick={() => viewContext.setCurrentView('main')}
            >
              Back
            </button>
          </section>
        </div>
      }
    </Fragment>
  )
}

export default GroupViewer