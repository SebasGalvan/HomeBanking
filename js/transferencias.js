const datos= JSON.parse(sessionStorage.getItem('datos'))

if  (datos == null ) {
  location.replace('../paginas/401.html')
}

if((datos.usuario==null) && (datos.password==null)){
  location.replace('../paginas/401.html');
}

function inicio(){

  const cerrar_sesion = document.querySelector("#cerrarSession")
  cerrar_sesion.addEventListener('click',cerrarSesionMovimientos);

}



function agregarMovimiento(){
    cargarMovimiento()
    let listaMovimientos = JSON.parse(sessionStorage.getItem("movimientos"))
    console.log(listaMovimientos.length);
    let indice = listaMovimientos.length;

   
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
    url: 'https://my-json-server.typicode.com/SebasGalvan/HomeBanking/movimientos',
    data: miObjeto
  });

  console.log("todoOK");
}


function cerrarSesionMovimientos() {
  cerrarSesion();
}


inicio()