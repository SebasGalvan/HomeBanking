'use strict';
const formularioLogin = document.querySelector('#formulario__login');
const btnSubmitUsuario = document.querySelector('#btnUsuario');
const inputUsuario = document.querySelector('#inputUsuario');


eventListeners();
function eventListeners() {

    btnSubmitUsuario.addEventListener('click', consultarUsuario);

    document.addEventListener('DOMContentLoaded',()=>{
        
    })
}
class UILogin{


    agregarFormContraseña(){


        const divBienvenida =  document.createElement('div');
        divBienvenida.classList = 'div__bienvenida'

        const logo_usuario_correcto =  document.createElement('div');
        logo_usuario_correcto.id = 'logo_usuario_correcto';

        const usuario = document.createElement('div');
        usuario.className = 'nombre__usuario-form'
        usuario.textContent = `Bienvenido: ${inputUsuario.value}`


        divBienvenida.appendChild(usuario);
        divBienvenida.appendChild(logo_usuario_correcto);

        const divContenedor = document.createElement('div');
        divContenedor.id = "form__input-contraseña"


        const divEtiquetas =  document.createElement('div');
        divEtiquetas.className = "div__etiquetas-password"

        const etiqueta = document.createElement('label')
        etiqueta.className = 'label__password'
        etiqueta.textContent = 'Contraseña: ';

        const logo_error_password =  document.createElement('div');
        logo_error_password.id = 'logo_error_password';

        const etiquetaError = document.createElement('label')
        etiquetaError.className = 'label__password-error'
        etiquetaError.hidden= true
        etiquetaError.textContent = '(*) Contraseña Incorrecta';

        divEtiquetas.appendChild(etiqueta);
        divEtiquetas.appendChild(logo_error_password);
        divEtiquetas.appendChild(etiquetaError);

        const divIcono =  document.createElement('div');
        divIcono.className = 'input__icono-contraseña';

        const inputPassword = document.createElement('input');
        inputPassword.type='password';
        inputPassword.name='input';
        inputPassword.className='inputPassword';
        inputPassword.placeholder='Ingrese su contraseña';
        
        divIcono.appendChild(inputPassword);

        divContenedor.appendChild(divEtiquetas);
        divContenedor.appendChild(divIcono);
      
        const divBotonEnviar = document.createElement('div');
        divBotonEnviar.id = 'form__boton-password';

        const botonEnviar =  document.createElement('button');
        botonEnviar.type='submit';

        botonEnviar.textContent= "Enviar";
        botonEnviar.addEventListener('click', validarPassword)
        divBotonEnviar.appendChild(botonEnviar);

        formularioLogin.appendChild(divBienvenida);
        formularioLogin.appendChild(divContenedor);
        formularioLogin.appendChild(divBotonEnviar);
       
    }

    quitarFormularioUsuario(){
        while (formularioLogin.firstChild) {
            formularioLogin.removeChild(formularioLogin.firstChild);
        }
    }
}
class Usuario{

    constructor(nombre,apellido){
        this.nombre =nombre;
        this.apellido = apellido; 
    }

    get nombre(){
        return this.nombre
    }

    set nombre(nombre){
        this.nombre = nombre
    }

    toString(){
        return  `${this.nombre}, ${this.apellido}`;
    }
}
        
function consultarUsuario(e){
    e.preventDefault();
    axios.get('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/usuarios', {
    
        params: {
            usuario: inputUsuario.value
          }
      })
      .then(function (response) {
        usuario =  response.data;
        if(usuario.length){
            ui.quitarFormularioUsuario();
            ui.agregarFormContraseña();  
        }
        else{
            const etiquetaError = document.querySelector('#error_usuario');
            etiquetaError.hidden =  false;
            setTimeout(() => {
                etiquetaError.hidden =  true;
            }, 5000);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        
      })
}
function guardarUsuarioSession(usuarioObj){
    
   const {nombre ,apellido} = usuarioObj;
    sessionStorage.setItem('Nombre', nombre)
    sessionStorage.setItem('Apellido', apellido)
}
function validarPassword(e){

    e.preventDefault();

    const campoPassword = document.querySelector('.inputPassword');

    axios.get('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/usuarios', {
    
        params: {
            usuario: inputUsuario.value,
            password: campoPassword.value 
          }
      })
      .then(function (response) {
        usuario =  response.data;
        if(usuario.length){
        console.log(usuario);
        guardarUsuarioSession(usuario[0]);
        location.replace('paginas/resumen.html');
        }
        else{

            const etiquetaError= document.querySelector('.label__password-error');
            etiquetaError.hidden =  false;
            
            setTimeout(() => {
                etiquetaError.hidden =  true;
            }, 5000);
            

        }
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        
      })
}

ui = new UILogin();