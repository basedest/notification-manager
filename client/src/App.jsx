import { createContext, useState } from 'react'
import Auth from './components/Auth'
import GroupMenu from './components/GroupMenu'
import GroupViewer from './components/GroupViewer'
import Navigation from './components/Navigation'
import NotificationMenu from './components/NotificationMenu'
import { useCookies } from "react-cookie"

export const ViewContext = createContext({})

function App() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [currentView, setCurrentView] = useState('main')
  const [accessToken, setAccessToken] = useState(cookies?.jwtToken)
  return (
    <ViewContext.Provider value={{currentView, setCurrentView, accessToken, setAccessToken}}>
      <main className='w-full min-h-screen m-auto md:max-w-3xl'>
        {
          !cookies.jwtToken
          ?<Auth />
          :currentView === 'groupView'
          ?<GroupViewer />
          :currentView === 'newNotification'
          ?<NotificationMenu />
          :currentView === 'newGroup'
          ?<GroupMenu />
          :currentView === 'auth'
          ?<Auth />
          :<Navigation />
        }
      </main>
      { 
        cookies.jwtToken !== undefined &&
        <footer className='bg-blue-100 border-t border-blue-300 flex flex-col items-center p-6 gap-2 text-lg leading-8'>
        <div>You logged in as <span className='text-blue-800'>{cookies.username}</span></div>
        <button 
        onClick={() => {
          removeCookie('username')
          removeCookie('jwtToken')
          setCurrentView('auth')
        }}
        className='text-blue-500 px-4 py-1 font-medium border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all hover:scale-105'>
        log out
        </button>
      </footer>
      }
    </ViewContext.Provider>
  )
}

export default App
