import React, { useState }  from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './Login.css'

const cookies = new Cookies();
const MySwal = withReactContent(Swal)

export const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const iniciarSession = async (e) => {
        e.preventDefault();
        const dataUser = await axios.get(`https://mthhurndg7.execute-api.us-east-1.amazonaws.com/bpi/support/validate-user?username=${user}&password=${password}`, { headers: { 'x-api-key': 'lsbr2PeLqi42e1WdaAmlR6x3yc82YAThaUuEcTqJ' } })

        const dataUsuarioConfirm = dataUser.data.data
      
        const { message, data, statusCode } = dataUsuarioConfirm

        if (statusCode === 200) {
            //se establece en todas las rutas
            cookies.set('data', data, { path: '/' });
            MySwal.fire({
                title: 'Bienvenid@',
                text: `${data.firstname}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            })
            
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500);
        } else {
            MySwal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            })
            navigate('/')
        }
    }

    return (
        <div className="login">
        <div className="login__header">

            <img className="login__header__logo" src="img/rpalatam-logo.png" alt="" />

            <h6>Support by <a href="https://rpalatam.com.pe/"  >RPA LATAM</a> </h6>
        </div>
        <div className="login__body">

            <div className='login__body__content__top'>

            </div>
            <div className='login__body__content__hero'>
                <p>Ingrese sus credenciales</p>
                <div className="login__body__content__formulario">

                    <input type="text"
                        required
                        onChange={(e) => setUser(e.target.value)}
                        name="user"
                        placeholder="Usuario" />
                    <input type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="password" />

                    <button onClick={iniciarSession} type="submit" >Ingresar</button>
                </div>
            </div>
        </div>

    </div>
    )
}
