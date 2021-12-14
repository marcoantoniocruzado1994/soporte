import React, { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './SolicitudNew.css';
import axios from 'axios';


//esto para toda las paginas
import Cookies from "universal-cookie";

const cookies = new Cookies();
//esto para toda las paginas
//mensajes de alerta
const MySwal = withReactContent(Swal)

const SolicitudNew = () => {

    const session = cookies.get("data");

    const [nombre, setNombre] = useState(session.firstname + ", " + session.lastname);
    const [email, setEmail] = useState(session.email);
    const [tipo, setTipo] = useState("");
    const [detalle, setDeatalle] = useState("");
    const [archivo, setArchivo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const converBase64 = (file) => {
        if (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                MySwal.fire({
                    title: 'Felicitaciones, ticket y email enviado',
                    text: `${session.firstname},${session.lastname}`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                })
            });
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Error:',
                text: 'Completa todos los campos',
            })
        }
    }

    const RegistarTicket = async (e) => {
        e.preventDefault();
        const archivoConvertido = await converBase64(archivo)

        let request_category;

        if (tipo === "Requerimiento") {
            request_category = "1"
        } else {
            request_category = "2"
        }

        const URL = 'https://mthhurndg7.execute-api.us-east-1.amazonaws.com/bpi/support/register-ticket'
        const data = {
            email: email,
            name: nombre,
            request_category: request_category,
            request_subcategory: detalle,
            request_platform: "Chatbot",
            description: descripcion,
            base64File: archivoConvertido
        }
        console.log(data);

        //en axios siempre  se pone la url luego la data y luego las cabeceras
        const respuesta = await axios.post(URL, data, {
            headers: {
                'x-api-key': 'lsbr2PeLqi42e1WdaAmlR6x3yc82YAThaUuEcTqJ'
            }
        })
        //console.log(respuesta);
    }

    return (

        <>
            <div className="container">
                <div className="row d-flex flex-column align-content-center justify-content-center">
                    <div className="col-md-8">
                        <div className="card ">
                            <div className="card-header">
                                <h3>Nueva Solicitud</h3>
                            </div>
                            <div className="card-body">
                                <form className="">
                                    <div className="form-group ">
                                        <label for="nombre p-2">Nombre Completo</label>
                                        <input type="text" required className="form-control" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                                    </div>
                                    <div className="form-group ">
                                        <label for="correo p-2">Correo</label>
                                        <input type="text" required className="form-control" id="correo" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group ">
                                        <label for="exampleFormControlSelect1">Tipo Solicitud</label>
                                        <select id="tipo" required onChange={e => setTipo(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                                            <option >Selecciona una opcion</option>
                                            <option>Requerimiento</option>
                                            <option>Incidencia</option>
                                        </select>
                                    </div>

                                    {
                                        tipo === "Requerimiento" ?
                                            <div className="form-group ">
                                                <label for="exampleFormControlSelect1">Detalle de Solicitud</label>
                                                <select id="detalle" onChange={e => setDeatalle(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                                                    <option >Selecciona una opcion</option>
                                                    <option>Incluir nuevas keywords</option>
                                                    <option>Actualización de promociones</option>
                                                    <option>Actualización de textos o imágenes</option>
                                                    <option>Cambio de flujos conversacionales</option>
                                                    <option>Cambios en la derivaciones C2C/CHATTERS</option>
                                                </select>
                                            </div> : tipo === "Incidencia" ?
                                                <div className="form-group ">
                                                    <label for="exampleFormControlSelect1">Detalle de Solicitud</label>
                                                    <select id="detalle" onChange={e => setDeatalle(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                                                        <option >Selecciona una opcion</option>
                                                        <option>Incidencia en Adquirir Suscripción</option>
                                                        <option>Incidencia en Información de suscripción</option>
                                                        <option>Incidencia en Club El Comercio</option>
                                                        <option>Incidencia en PerúQuiosco</option>
                                                        <option>Incidencia en Cambios y solicitudes</option>
                                                        <option>Incidencia en Cancelar Suscripción</option>
                                                        <option>Incidencia en Formulario</option>
                                                        <option>Incidencia en Dashboard</option>
                                                        <option>Incidencia en Circulación</option>
                                                        <option>Otros</option>
                                                    </select>
                                                </div> : null
                                    }
                                    <div className="form-group ">
                                        <p>Adjuntar archivo</p>
                                        <input id="archivo" onChange={e => setArchivo(e.target.files[0])} type="file" className="form-control-file" />
                                    </div>
                                    <div className="form-group ">
                                        <label for="exampleFormControlTextarea1">Descripcion de Solicitud</label>
                                        <textarea id="descripcion" required onChange={e => setDescripcion(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                                    </div>
                                    <div className="form-group ">
                                        <input type="button" onClick={RegistarTicket} className=" btn boton__new btn-primary btn-block form-control" value="Enviar Solicitud" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );

}

export default SolicitudNew

