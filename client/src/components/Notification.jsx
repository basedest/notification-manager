import React from 'react'

const Notification = ({data, handleRead, readButton}) => {
  return (
    <div className='flex w-full p-2 border rounded-lg bg-blue-100 hover:bg-blue-200 transition justify-between my-2'>
        <section className='max-w-[70%]'>
            <div className='text-blue-900'>{data.content}</div>
            <div className='text-sm text-neutral-500 font-light'>{new Date(data.time).toLocaleString()}</div>
        </section>
        { 
          readButton && <button 
            className='tracking-tight font-light text-lg px-4 bg-blue-500 rounded-lg text-white transition-all hover:scale-105 hover:bg-blue-600'
            onClick={() => handleRead(data.id)}>
            mark as read
          </button>
        }
    </div>
  )
}

export default Notification