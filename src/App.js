import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import  Dasboard  from './pages/Dasboard'
import { Login } from './pages/Login'
import { NotFoundPage } from './pages/NotFoundPage'
import  AddUser  from './pages/AddUser'
import  AddClient  from './pages/AddClient'
import  LisrtClient  from './pages/LisrtClient'
import  SolicitudNew  from './pages/SolicitudNew'
import  SolicitudStatus  from './pages/SolicitudStatus'
import  ConfigProfile  from './pages/ConfigProfile'
import  SupportAndHelp  from './pages/SupportAndHelp'
import  ErrorNotFound  from './pages/ErrorNotFound'


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dasboard />} >
          <Route path="usuarios" element={<p>Usuarios</p>} />
          <Route path="clientes" element={<p>Clientes</p>} />
          <Route path="solicitud" element={<p>Solicitudes</p>} />
          <Route path="configuracion" element={<p>Configuracion</p>} />
          <Route path="usuarios/agregar-usuario" element={<AddUser />} />
          <Route path="clientes/agregar-cliente" element={<AddClient/>} />
          <Route path="clientes/listar-cliente" element={<LisrtClient/>} />
          <Route path="solicitud/nueva-solicitud" element={<SolicitudNew/>} />
          <Route path="solicitud/estado-solicitud" element={<SolicitudStatus/>} />
          <Route path="configuracion/perfil" element={<ConfigProfile/>} />
          <Route path="configuracion/soporte-y-ayuda" element={<SupportAndHelp/>} />
        </Route>
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
