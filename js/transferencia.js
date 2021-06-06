const datos= JSON.parse(sessionStorage.getItem('datos'))

if  (datos == null ) {
  location.replace('../paginas/401.html')
}

if((datos.usuario==null) && (datos.password==null)){
  location.replace('../paginas/401.html');
}

function inicio(){

  const cerrar_sesion = document.querySelector("#cerrarSession")
  cerrar_sesion.addEventListener('click',cerrarSesionTransferencia);

}



function agregarTransferencia(){
    cargarTransferencias()
    let listaTransferencias = JSON.parse(sessionStorage.getItem("transferencias"))
    console.log(listaTransferencias.length);
    let indice = listaTransferencias.length;

   
    console.log(indice);          
    const hoy = new Date() 
    miObjeto =  {

      "id": indice+1,
      "fecha": hoy,
      "titulo": "Deb. Autom. De Serv.",
      "descripcion": "Afip - Monotribut Monotr05/21 20220222272",
      "debito": "100,00",
      "credito": "0,00",
      "saldo parcial": "1000,00"
    }
    console.log(miObjeto);

  axios({
    method: 'post',
    url: 'https://my-json-server.typicode.com/SebasGalvan/HomeBanking/transferencias',
    data: miObjeto
  });

  console.log("todoOK");
}


function cerrarSesionTransferencia() {
  cerrarSesion();
}


inicio()