import React, { Component } from 'react'
import { useNavigate, Link, Outlet } from 'react-router-dom'
import './Dashboard.css'
import $ from 'jquery'

import Cookies from "universal-cookie";


const cookies = new Cookies();


export default class Dasboard extends Component {



  handleClick() {
    /* matar la session */
    window.location.href = '/'
  }

  componentDidMount() {
    $(".sidebar-dropdown > a").on('click', function () {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });

    $("#close-sidebar").on('click', function () {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").on('click', function () {
      $(".page-wrapper").addClass("toggled");
    });


  }

  render() {
    const session = cookies.get("data");
    console.log(session);
    return (
      <div className="page-wrapper chiller-theme toggled">
        <a id="show-sidebar" className="btn btn-sm btn-dark">
          <i className="fas fa-bars"></i>
        </a>
        {/* Sidebar */}
        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-brand">
              <Link to="/dashboard">Soporte RpaLatam</Link>
              <div id="close-sidebar">
                <span className="fas fa-times"></span>
              </div>
            </div>

            <div className="sidebar-header">
              <div className="user-pic">
                <img className="img-responsive img-rounded" src="https://maxcdn.icons8.com/Share/icon/Users/administrator_male1600.png" alt="User picture" />
              </div>
              <div className="user-info">
                <span className="user-name">{session.firstname}
                  <strong> {session.lastname}</strong>
                </span>
                <span className="user-role"> {session.rol_id == "1" ? "Administrador" : "Cliente"}</span>
                <span className="user-status">
                  <i className="fa fa-circle"></i>
                  <span>Online</span>
                </span>
              </div>
            </div>
            {/*   <!-- sidebar-header  --> */}

            <div className="sidebar-menu">
              <ul>
                <li className="header-menu">
                  <span>General</span>
                </li>
                {session.rol_id === 1 ?

                  [
                  <li className="sidebar-dropdown">
                    <Link to="usuarios">
                      <i className="fa fa-tachometer-alt"></i>
                      <span>Usuarios</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="usuarios/agregar-usuario">Agregar Usuarios</Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                    ,
                  <li className="sidebar-dropdown">
                    <Link to='clientes'>
                      <i className="fa fa-shopping-cart"></i>
                      <span>Clientes</span>
                    </Link>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <Link to="clientes/agregar-cliente">
                            Clientes/Add
                          </Link>
                        </li>
                        <li>
                          <Link to="clientes/listar-cliente">clientes/list</Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  ] : [
                    <li className="sidebar-dropdown">
                      <Link to="solicitud">
                        <i className="far fa-gem"></i>
                        <span>Solicitudes</span>
                      </Link>
                      <div className="sidebar-submenu">
                        <ul>
                          <li>
                            <Link to="solicitud/nueva-solicitud">solicitud/new</Link>
                          </li>
                          <li>
                            <Link to="solicitud/estado-solicitud">solicitud/status</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    ,
                    <li className="sidebar-dropdown">
                      <Link to="configuracion">
                        <i className="fa fa-chart-line"></i>
                        <span>Configuración</span>
                      </Link>
                      <div className="sidebar-submenu">
                        <ul>
                          <li>
                            <Link to="configuracion/perfil">configuracion/Perfil</Link>
                          </li>
                          <li>
                            <Link to="configuracion/soporte-y-ayuda">configuracion/soporte</Link>
                          </li>
                        </ul>
                      </div>
                    </li>]
                }
              </ul>
            </div>
            {/*  <!-- sidebar-menu  --> */}
          </div>
          {/* <!-- sidebar-content  --> */}
          <div className="sidebar-footer">
            <a onClick={this.handleClick}>
              <i className="fa fa-power-off"></i>
            </a>
          </div>
        </nav>
        {/* Content */}
        <main className="page-content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    )
  }
}
