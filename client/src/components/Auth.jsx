import { Dialog } from '@headlessui/react'
import React, { Fragment, useContext, useState } from 'react'
import { ViewContext } from '../App'
import { XIcon } from '@heroicons/react/solid'
import { useCookies } from "react-cookie"

const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState('login')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [error, setError] = useState(null)
    const [errorHints, setErrorHints] = useState([])
    const viewContext = useContext(ViewContext)
    const [cookies, setCookie] = useCookies()

    return (
        <Fragment>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                className="fixed z-500 bg-opacity-50 bg-black inset-0 flex justify-center items-center"
                >
                    
                    <Dialog.Panel className="w-full max-w-sm rounded bg-white flex flex-col items-center justify-center p-8">
                        <div className='flex justify-end self-end -mt-6 -mr-6'>
                            <button 
                                onClick={() => setDialogOpen(false)}
                                className='transition hover:scale-150 hover:text-red-600'
                            >
                                <XIcon className='w-4 h-4' />
                            </button>
                        </div>
                        <Dialog.Title className='text-red-500 text-2xl font-bold mb-2'>Error</Dialog.Title>
                        <span className='text-lg text-red-900 font-medium'>{error}</span>
                        {
                            errorHints.map((err, id) => <span className='text-gray-500 text-sm' key={id}>{err}</span>)
                        }
                    </Dialog.Panel>
            </Dialog>
            <div
                className='flex flex-col min-h-screen justify-center items-center'
            >
                <form onSubmit={e => e.preventDefault()} className='flex flex-col py-6 px-12 gap-3 shadow-lg rounded-xl items-center bg-blue-100'>
                    <h1 className='text-2xl font-medium text-blue-900'>
                        {
                            mode === 'login' ? 'Login' : 'Register'
                        }
                    </h1>
                    <section>
                        <label className='text-sm text-neutral-400 font-light'>
                        Username
                        </label>
                        <input
                            className='block w-full px-3 py-2 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300'
                            type='text'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </section>
                    <section>
                        <label className='text-sm text-neutral-400 font-light'>
                        Password
                        </label>
                        <input
                            className='block w-full px-3 py-2 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300'
                            type='password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </section>
                    <p className='flex gap-1 text-sm text-gray-500'>
                        {
                            mode === 'login'
                            ?
                            <>
                                <span>Not registered?</span>
                                <button
                                    className='text-blue-800 hover:text-blue-500 hover:underline'
                                    onClick={() => setMode('register')}
                                >
                                    Create an account
                                </button>
                            </>
                            :
                            <>
                                <span>Already have an account?</span>
                                <button
                                    className='text-blue-800 hover:text-blue-500 hover:underline'
                                    onClick={() => setMode('login')}
                                >
                                    Log in
                                </button>
                            </>
                        }
                    </p>
                    <button
                        className='text-lg px-3 py-1 rounded-lg border-blue-500 border text-blue-500 transition-all hover:bg-blue-500 hover:text-white hover:scale-105'
                        onClick={() => {
                            let status = 0
                            fetch(`http://localhost:5000/auth/${mode}`, 
                            {
                            method: 'POST',
                            body: JSON.stringify({
                                username,
                                password
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                            })
                            .then(res => {
                                status = res.status
                                return res.json()
                            })
                            .then((data) => {
                                if (status >= 400) {
                                    setError(data.message)
                                    setDialogOpen(true)
                                    data.errors && setErrorHints(data.errors.errors.map(error => error.msg))
                                    return
                                }
                                console.log(data)
                                let d = new Date()
                                d.setDate(d.getDate() + 1)
                                viewContext.setAccessToken('Bearer ' + data.token)
                                setCookie('jwtToken', 'Bearer ' + data.token, {path: '/', expires: d, secure: true, sameSite: true})
                                setCookie('role', data.role, {path: '/', expires: d, secure: true, sameSite: true})
                                setCookie('username', username, {path: '/', expires: d, secure: true, sameSite: true})
                                viewContext.setCurrentView('main')
                            })
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Fragment>
    )
}

export default Auth