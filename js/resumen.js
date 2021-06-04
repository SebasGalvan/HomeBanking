nombre= sessionStorage.getItem('Nombre')
apellido= sessionStorage.getItem('Apellido')
console.log(nombre);
console.log(apellido);


if (!(nombre==null) && !(apellido==null)) {
let transferenciasLista = [];
const filas = 20;
let control_paginas= 1;
let ordenamiento = "";

class UIResumen{

  


  llenarTabla(lista){

    const cabecera = document.createElement('tr');


    const id = document.createElement('th')
    id.id="indice"
    id.textContent="ID"
    const th1 = document.createElement('th')
    th1.textContent="Fecha";
    const imagenFecha =  document.createElement('img')
    imagenFecha.id ="ordenar"
    imagenFecha.addEventListener('click', ordenarPorFecha)

    th1.appendChild(imagenFecha);
    const th2 = document.createElement('th')
    th2.textContent="Titulo";
    const th3 = document.createElement('th');
    th3.id="detalle"
    th3.textContent="Detalle";
  
  
    cabecera.appendChild(id);
    cabecera.appendChild(th1);
    cabecera.appendChild(th2);
    cabecera.appendChild(th3);

    const tabla =  document.querySelector("#tabla__resumen")

    tabla.appendChild(cabecera);



      let rows = control_paginas * filas;
      let i=0;
      while(i<lista.length && i<rows ){
        const row = document.createElement("tr");

        const imagen = document.createElement('img');
        imagen.src = "../iconos/add_circle.png";
        imagen.id = "imagen_ver_detalle";

        const th_detalle = document.createElement('tr');
        th_detalle.classList = 'tr_detalle';
        th_detalle.appendChild(imagen);

        // <td>${lista[t].id}</td>

        row.innerHTML = `
                <td>${i+1}</td>
                <td>${lista[i].fecha.toLocaleDateString()}</td>
                <td>${lista[i].titulo}</td>  
            `;
        row.appendChild(th_detalle);
        tabla.appendChild(row);

        i++;

      }
    }
  sincronizarLista(lista){
    sessionStorage.setItem('transferencias', JSON.stringify(lista));
  } 

  limpiarTabla(){

    const tabla =  document.querySelector("#tabla__resumen");
    while (tabla.firstChild) {
      tabla.removeChild(tabla.firstChild);
  }
}}

UI = new UIResumen();

inicio();
function inicio() { 


    eventListeners();


    let transferencias;
    axios.get('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/transferencias', {
              })
              .then(function (response) {
                transferencias =  response.data;
                console.log(transferencias);
                transferencias.forEach(t => { 
                    t.fecha = convertirStringADate(t.fecha)  
                });
                transferenciasLista = transferencias.slice();
                UI.llenarTabla(transferenciasLista);
                const ordenar = document.querySelector("#ordenar");
                ordenar.src="../iconos/vertical_align_bottom.png"

                UI.sincronizarLista(transferenciasLista);
                
              })
              .catch(function (error) {
                console.log(error);
              })
  
}


function eventListeners(){
  const botonBuscar = document.querySelector('#boton__buscar');
  botonBuscar.addEventListener('submit', filtrarPorTitulo);

  const etiquetaCancelarFiltro = document.querySelector("#cancelar_filtro")
  etiquetaCancelarFiltro.addEventListener('click',cancelarFiltro);
  
  const mostrarMas = document.querySelector("#mostrar_mas")
  mostrarMas.addEventListener('click',mostrarMasFilas);
  
  const cerrar_sesion = document.querySelector("#cerrarSession")
  cerrar_sesion.addEventListener('click',cerrarSesionResumen);

}


function convertirStringADate(fechaObj){
  var nueva=fechaObj.split('/');
  dd = nueva[0];
  mm = nueva[1]-1;
  yyyy = nueva[2];
  let fecha = new Date(yyyy,mm,dd);
  return fecha;
}


function ordenarPorFecha(){


  const etiquetaCancelarFiltro = document.querySelector("#cancelar_filtro")
  etiquetaCancelarFiltro.hid
  
  if(ordenamiento==""){
    UI.llenarTabla(transferenciasLista);
    ordenamiento="Asc"
    return;
  }
  

  let lista = transferenciasLista.slice();
  listaOrdenada = lista.sort(function (a, b) {
      if (a.fecha > b.fecha) {
        return 1;
      }
      if (a.fecha < b.fecha) {
        return -1;
      }
      return 0;
    });

  UI.limpiarTabla();


  if (ordenamiento == "Asc") {
    ordenamiento = "Desc";
    UI.llenarTabla(lista);
    const ordenar = document.querySelector("#ordenar");
    ordenar.src = "../iconos/vertical_align_top.png"

  } else {
    lista = lista.reverse();
    ordenamiento = "Asc";
    UI.llenarTabla(lista);
    const ordenar = document.querySelector("#ordenar");
    ordenar.src = "../iconos/vertical_align_bottom.png"
  }

}

function filtrarPorTitulo(e){
  e.prevenDefault();
}

function cancelarFiltro() {
  const etiquetaCancelarFiltro = document.querySelector("#cancelar_filtro")
  etiquetaCancelarFiltro.hidden= true;
  UI.limpiarTabla();
  UI.llenarTabla(transferenciasLista);
  const ordenar = document.querySelector("#ordenar");
  ordenar.src = "../iconos/vertical_align_top.png"
}

function mostrarMasFilas() {
  control_paginas++;
  UI.limpiarTabla();
  ordenarPorFecha();
  console.log(control_paginas);
}

function cerrarSesionResumen() {
      cerrarSesion();
  // sessionStorage.removeItem("Nombre");
  // sessionStorage.removeItem("Apellido");
  // sessionStorage.removeItem('transferencias');
  // location.replace('../index.html');
}

}else{

  location.replace('../paginas/401.html');

}