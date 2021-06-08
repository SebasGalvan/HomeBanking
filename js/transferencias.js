const datos = JSON.parse(sessionStorage.getItem('datos'))

if (datos == null) {
  location.replace('../paginas/401.html')
}

if ((datos.usuario == null) && (datos.password == null)) {
  location.replace('../paginas/401.html');
}
const inputNombre = document.querySelector("#input__nombre");
const inputApellido = document.querySelector("#input__apellido");
const inputDni = document.querySelector("#input__dni");
const inputNroCuenta = document.querySelector("#input__nro-cuenta");
const inputCbu = document.querySelector("#input__cbu");
const inputMonto = document.querySelector("#input__monto");

indice = 0;

inicio();

function inicio() {
  const cerrar_sesion = document.querySelector("#cerrarSession")
  cerrar_sesion.addEventListener('click', cerrarSesionMovimientos);

  const boton_transferencia = document.querySelector("#boton_realiazar_transferencia")
  boton_transferencia.addEventListener('click', agregarTransaccion);

  inputNombre.addEventListener("blur",verificarNombre)
  inputApellido.addEventListener("blur",verificarApellido)
  inputDni.addEventListener("blur",verificarDni)
  inputNroCuenta.addEventListener("blur",verificarNroCuenta)
  inputCbu.addEventListener("blur",verificarCbu)
  inputMonto.addEventListener("blur",verificarMonto)


}
class Transferencia {
  constructor(nombre, apellido, dni, nroCuenta, cbu, monto) {
    this.id;
    this.fechaHora;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.nroCuenta = nroCuenta;
    this.cbu = cbu;
    this.monto = monto;
  }
}

function agregarTransaccion(e) {

  e.preventDefault();

  if(inputNombre.value =="" || inputApellido.value =="" || inputDni.value =="" || inputNroCuenta.value =="" | inputCbu.value =="" || inputMonto.value ==""){
    const faltan_completar_campos = document.querySelector("#faltan_completar_campos")
    faltan_completar_campos.hidden = false;
    setInterval(() => {
      faltan_completar_campos.hidden = true;
    }, 7000);
    return
  }

  let miTransferencia  = new Transferencia(inputNombre.value,inputApellido.value,inputDni.value,inputNroCuenta.value,inputCbu.value,inputMonto.value);
  cargarTransferencia(miTransferencia);
 
}


function cerrarSesionMovimientos() {
  cerrarSesion();
}


function verificarNombre() {
  const errorCampoObligatorio = document.querySelector("#campo_obligatorio_nombre")
  if (this.value == "") {
    errorCampoObligatorio.hidden = false;
    setInterval(() => {
      errorCampoObligatorio.hidden = true;
    }, 7000);
}}

function verificarApellido() {
  const errorCampoObligatorio = document.querySelector("#campo_obligatorio_apellido")
  if (this.value == "") {
    errorCampoObligatorio.hidden = false;
    setInterval(() => {
      errorCampoObligatorio.hidden = true;
    }, 7000);
}}

function verificarDni() {
  const errorCampoObligatorio = document.querySelector("#campo_obligatorio_dni")
  if (this.value == "") {
    errorCampoObligatorio.hidden = false;
    setInterval(() => {
      errorCampoObligatorio.hidden = true;
    }, 7000);
}}

function verificarNroCuenta() {
  const errorCampoObligatorio = document.querySelector("#campo_obligatorio_nro-cuenta")
  if (this.value == "") {
    errorCampoObligatorio.hidden = false;
    setInterval(() => {
      errorCampoObligatorio.hidden = true;
    }, 7000);
}}

function verificarCbu() {

  if (this.value == "") {
    const cbuObligatorio = document.querySelector("#campo_obligatorio_cbu");
    cbuObligatorio.hidden = false
    setTimeout(() => {
      cbuObligatorio.hidden = true
    }, 7000);
  } else if (this.value.length != 22) {
    const cbuNoValido = document.querySelector("#campo_no_valido_cbu");
    cbuNoValido.hidden = false;
    setTimeout(() => {
      cbuNoValido.hidden = true;
    }, 7000);
}}

function verificarMonto() {

  const datos =  JSON.parse(sessionStorage.getItem("datos"));
  if (this.value == "") {
    const montoObligatorio = document.querySelector("#campo_obligatorio_monto");
    montoObligatorio.hidden = false
    setTimeout(() => {
      montoObligatorio.hidden = true
    }, 7000);
  } else if ((Number(this.value) < 0) || (Number(this.value) > 1000000)) {
    const montoNoValido = document.querySelector("#campo_no_valido_monto");
    montoNoValido.hidden = false;
    setTimeout(() => {
      montoNoValido.hidden = true;
    }, 7000);

  }else if (Number(this.value)> datos.saldo) {
    const montoInsuficiente = document.querySelector("#monto_insuficiente");
    montoInsuficiente.hidden = false;
    setTimeout(() => {
    montoInsuficiente.hidden = true;
    }, 7000);
  }
}


function cargarTransferencia(objTransferencia){

      
    obtenerIndice();

    objTransferencia.id = indice + 1;
    const hoy = new Date()
    objTransferencia.fechaHora= hoy


    axios({
      method: 'post',
      url: 'https://my-json-server.typicode.com/SebasGalvan/HomeBanking/transferencias',
      data: objTransferencia
    });

    const datos = JSON.parse(sessionStorage.getItem("datos"));
    datos.saldo -= objTransferencia.monto;
    sessionStorage.setItem("datos",JSON.stringify(datos)); 
    actualizarMonto();

    const exito = document.querySelector("#transaccion_completada");
    exito.hidden = false;
    setInterval(() => {
      exito.hidden = true;
    }, 7000);

    limpiarFormulario()
    

}

function obtenerIndice(){

  let transferencias = [];
  axios.get('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/transferencias', {
            })
            .then(function (response) {
              transferencias =  response.data;
              indice =  transferencias.length;
            })
            .catch(function (error) {
              console.log(error);
            })


}

function limpiarFormulario(){
  const formulario = document.querySelector("#formulario__transferencia");
}