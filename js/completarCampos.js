const nombreUsuario = document.querySelector("#nombre__usuario")
const idCuentaUsuario = document.querySelector("#idcuenta__usuario")
const saldoUsuario = document.querySelector("#saldo__usuario")


const miObjeto = JSON.parse(sessionStorage.getItem("datos"));
console.log(miObjeto);

nombreUsuario.textContent =  miObjeto.nombre + " " + miObjeto.apellido;
idCuentaUsuario.textContent =  miObjeto.idCuentaBancaria
saldoUsuario.textContent =  "$ " +miObjeto.saldo
