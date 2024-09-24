import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const userInfo = {
  name : "User 1",
  age : 23
}

const userInfoContext = createContext(userInfo);

createRoot(document.getElementById('root')).render(
  <userInfoContext.Provider value={userInfo}>
    <StrictMode>
      <App />
    </StrictMode>,
  </userInfoContext.Provider>
)

export default userInfoContext;
