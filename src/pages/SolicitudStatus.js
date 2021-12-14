import React, { useState } from 'react';
import './SolicitudStatus.css';
//esto para toda las paginas
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from "universal-cookie";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const cookies = new Cookies();
const MySwal = withReactContent(Swal)
//esto para toda las paginas 8956

const SolicitudStatus = () => {

	const [numTicket, setNumTicket] = useState("")
	const [estado, setEstado] = useState("")
	const [fechaCreacion, setFechaCreacion] = useState("")
	const [tipo, setTipo] = useState("")
	const [detalle, setDetalle] = useState("")
	const [id, setId] = useState("")


	const session = cookies.get("data");

	const infoTicket = async (e) => {
		e.preventDefault();

		if (numTicket === "" || numTicket.length !== 4) {
			MySwal.fire({
				title: 'Error',
				text: 'Ingrese un numero de ticket valido',
				icon: 'error',
				showConfirmButton: false,
				timer: 1500,
			})
		} else {
			const dataTicket = await axios.get(`https://mthhurndg7.execute-api.us-east-1.amazonaws.com/bpi/support/view-ticket/${numTicket}`, { headers: { 'x-api-key': 'lsbr2PeLqi42e1WdaAmlR6x3yc82YAThaUuEcTqJ' } })
			const { statusCode, data, message, status } = dataTicket.data.data;
			console.log(statusCode, data, message, status);
			if (statusCode === 200) {
				MySwal.fire({
					title: 'Verificando',
					text: dataTicket.data.data.message,
					icon: 'success',
					showConfirmButton: false,
					timer: 1500,
				})
				setEstado(status)
				setFechaCreacion(data.created_at)
				setTipo(data.custom_fields.cf_support_category)
				setDetalle(data.custom_fields.cf_support_subcategory)
				setId(data.id)
			} else {
				MySwal.fire({
					title: 'Error',
					text: message,
					icon: 'error',
					showConfirmButton: false,
					timer: 1500,
				})
			}
		}
	}


	return (
		<>
			<div className="container ">
				<div className="row d-flex flex-column align-content-center justify-content-center ">
					<div className="col-md-8">
						<div className="card">
							<div className="card-header">
								<h3>Estado de Solicitud</h3>
							</div>
							<div className="card-body">
								<form className="">
									<div className="form-group p-3">
										<label for="nombre p-2"># Número de Ticket</label>
										<input type="number" required className="form-control" id="numTicket" onChange={e => setNumTicket(e.target.value)} />
									</div>
									<div className="form-group p-3">
										<input type="button" onClick={infoTicket} className=" boton__celeste btn btn-primary btn-block form-control" value="Ver estado" />
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				{/* Rederizado del ticket */}

				{
					estado !== "" ?
					<div className="row d-flex flex-column align-content-center justify-content-center">
					<div className="col-md-4">
						<div className="card  mt-4">
							<div className="card-header">
								<p>Ticket #{id}</p>
							</div>
							<div className="card-body">
								<form className="">
									<div className="formulario form-group p-3">
										<p>Estado de ticket :<span> {estado} </span> </p>
										<p>Fecha de creación : <span>{fechaCreacion} </span></p>
										<p>Tipo de Solicitud : <span>{tipo} </span></p>
										<p>Detalle de solicitud :<span>{detalle} </span> </p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>:null
				}

				
			</div>

		</>
	);

}

export default SolicitudStatus
