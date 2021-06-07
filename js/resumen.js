datos= JSON.parse(sessionStorage.getItem('datos'))

if  (datos == null ) {
  location.replace('../paginas/401.html')
}

if((datos.usuario==null) && (datos.password==null)){
  location.replace('../paginas/401.html');
}

let movimientosLista = [];
const filas = 20;
let control_paginas= 1;
let ordenamiento = "";
let filaAnterior = "";

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
    imagenFecha.src= "../iconos/vertical_align_bottom.png"
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
        row.classList="fila__tabla"
        row.id = i

        const imagen = document.createElement('img');
        imagen.src = "../iconos/add_circle.png";
        imagen.classList = "imagen__mostrar-mas"
        imagen.id = lista[i].id;
        imagen.addEventListener("click",ver_detalle)

        const td_detalle = document.createElement('td');
        td_detalle.id = 'td_detalle';
        td_detalle.appendChild(imagen);

        // <td>${lista[t].id}</td>

        row.innerHTML = `
                <td>${i+1}</td>
                <td>${lista[i].fecha.toLocaleDateString()}</td>
                <td>${lista[i].titulo}</td>  
            `;
        row.appendChild(td_detalle);
        tabla.appendChild(row);

        i++;

      }
    }
  sincronizarLista(lista){
    sessionStorage.setItem('movimientos', JSON.stringify(lista));
  } 

  limpiarTabla(){

    const tabla =  document.querySelector("#tabla__resumen");
    while (tabla.firstChild) {
      tabla.removeChild(tabla.firstChild);
  }}

  cargarInfoDatos(registro){

    const mas__informacion = document.querySelector("#mas__informacion");
    mas__informacion.hidden= false;

    //let {id,fecha,titulo,descripcion,debito,credito, saldoParcial} = registro;

    const contenedor_div = document.createElement('div');
    contenedor_div.classList = "div__informacion"

    for (const t in registro) {

      const contenedor =  document.createElement("div");
      contenedor.classList="div_info_items"
      const span = document.createElement('span');
      span.classList = t + "__span"
      span.textContent = t.toUpperCase() +" : "
      const p = document.createElement('p');
      p.textContent = `${registro[t]}`
      contenedor.appendChild(span);
      contenedor.appendChild(p);
      contenedor_div.appendChild(contenedor);
    }

   
    mas__informacion.appendChild(contenedor_div)
    const idOperacion =  document.querySelector(".id__span");
    idOperacion.textContent = "ID OPERACION: " 
  
  }

  limpiarInformacion(){
    const info =  document.querySelector("#mas__informacion");
    while (info.firstChild) {
      info.removeChild(info.firstChild);
  }}
}
UI = new UIResumen();

inicio();
function inicio() { 


    eventListeners();

    const mas__informacion = document.querySelector("#mas__informacion")
    mas__informacion.hidden = true

    let tmovimientos;
    axios.get('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/movimientos', {
              })
              .then(function (response) {
                movimientos =  response.data;
                movimientos.forEach(t => { 
                    t.fecha = convertirStringADate(t.fecha)  
                });
                movimientosLista = movimientos.slice();
                UI.llenarTabla(movimientossLista);
                const ordenar = document.querySelector("#ordenar");
                ordenar.src="../iconos/vertical_align_bottom.png"

                UI.sincronizarLista(movimientosLista);
              })
              .catch(function (error) {
                console.log(error);
              })
  
}


function eventListeners(){
  const botonBuscar = document.querySelector('#boton__buscar');
  botonBuscar.addEventListener('submit', filtrarPorTitulo);

  const etiquetaCancelarFiltro = document.querySelector(".cancelar_filtro")
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


  const img = document.querySelector(".cancelar_filtro img")
  const p = document.querySelector(".cancelar_filtro p")
  img.hidden= false
  p.hidden= false

  if(ordenamiento==""){
    ordenamiento="Asc"
    ordenarPorFecha();
    return;
  }
  

  let lista = movimientosLista.slice();
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

function filtrarPorTitulo(){
  e.prevenDefault();
}

function cancelarFiltro() {
  const img = document.querySelector(".cancelar_filtro img")
  const p = document.querySelector(".cancelar_filtro p")
  img.hidden= true;
  p.hidden= true;
  UI.limpiarTabla();
  UI.llenarTabla(movimientosLista);
  const ordenar = document.querySelector("#ordenar");
  ordenar.src = "../iconos/vertical_align_top.png"
  UI.limpiarInformacion(filtros)
}

function mostrarMasFilas() {
  
  control_paginas++;
  UI.limpiarTabla();
  ordenarPorFecha();
  UI.limpiarInformacion()
 
}

function cerrarSesionResumen() {
      cerrarSesion();
}

function ver_detalle(){
  const registroID =  Number(this.id);
  filaAnterior.classList = "cleanBackgound"
  const miFila = this.parentNode.parentNode;
  filaAnterior = miFila
  miFila.classList = "cambiarColorFila";

  const datosRegistro = movimientosLista.filter(t => t.id == registroID)
  UI.limpiarInformacion()
  UI.cargarInfoDatos(datosRegistro[0])
  
} 