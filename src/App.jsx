import './App.css'
import { Route, Routes } from 'react-router-dom'
import  PrivateRoute from './utils/PrivateRoute'
import { LandingPage } from './components/LandingPage/LandingPage'
import { Login } from './components/User/Login/Login'
import { Register } from './components/User/Register/Register'

function App() {
  

  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

      <Route element={<PrivateRoute />}>
        <Route path='/landingpage' element={<LandingPage />} />
      </Route>
    </Routes>
    
  )
}

export default App
