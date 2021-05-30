// url home https://my-json-server.typicode.com/SebasGalvan/HomeBanking/db
const formularioLogin = document.querySelector('#formulario__login')
const btnSubmitUsuario = document.querySelector('#btnUsuario')
const inputUsuario = document.querySelector('#inputUsuario')


login = new Login();
UI = new UI();
API = new miAPI();


eventListeners();
function eventListeners() {

    btnSubmitUsuario.addEventListener('submit', login.consultarUsuario)

    document.addEventListener('DOMContentLoaded',()=>{
        
    })
}

class UILogin{


    agregarFormContraseña(usuario){

        const usuario = document.createElement('p');
        usuario.className = 'nombre__Usuario-form'
        usuario.textContent = usuario 

        const divContenedor = document.createElement('div');
        divContenedor.id = "form__input-contraseña"

        const etiqueta = document.createElement('label')
        etiqueta.textContent = 'Contraseña';

        const divIcono =  document.createElement('div');
        divIcono.className = 'input__icono-contraseña';

        const inputContraseña = document.createElement('input');
        inputContraseña.type='password';
        inputContraseña.name='input';
        inputContraseña.placeholder='Contraseña';

        divIcono.appendChild(inputContraseña);

        const errorCmpo1 =  document.createElement('i');
        const errorCmpo2 =  document.createElement('i');

        errorCmpo1.className='form__etiqueta-error'
        errorCmpo1.hidden=true
        errorCmpo1.textContent='Contraseña Incorrecta'
        
        errorCmpo2.className='form__etiqueta-error'
        errorCmpo2.hidden=true
        errorCmpo2.textContent='Campo obligatorio'

        divContenedor.appendChild(etiqueta);
        divContenedor.appendChild(divIcono);
        divContenedor.appendChild(errorCmpo1);
        divContenedor.appendChild(errorCmpo2);

        const divBotonEnviar = document.createElement('div');
        divBotonEnviar.className = 'form__boton-enviar';

        const botonEnviar =  document.createElement('button');
        botonEnviar.type='submit';
        botonEnviar.textContent= "Enviar";
   
        divBotonEnviar.appendChild(botonEnviar);

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
        return  `Usuario: ${this.nombre} ${this.apellido}`;
    }
}



class Login{

        
        consultarUsuario(){

                fetch('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/usuarios')
                    .then(function(response) {
                    return response.text();
                })
                .then(function(data) {
                    if(data.nombre = inputUsuario.value){
                    console.log('data = ', data);
                    return data;}
                    else{
                        return "Error usuario no encontrado"
                    }
                })
                .catch(function(err) {
                    console.error(err);
                });
                
        }

    


}
