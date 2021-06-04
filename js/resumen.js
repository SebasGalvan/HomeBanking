
let transferenciasLista = [];

class UIResumen{




  llenarTabla(lista){

    const tabla =  document.querySelector("#tabla__resumen")
    lista.forEach(t => {
        const row =  document.createElement("tr");

        const imagen =  document.createElement('img');
        imagen.src="../iconos/check_circle.png";
        imagen.id = "imagen_ver_detalle";

        const th_detalle = document.createElement('th');
        th_detalle.classList = 'th_detalle';
        th_detalle.appendChild(imagen);


        row.innerHTML=`

            <td>${t.id}</td>
            <td>${t.fecha}</td>
            <td>${t.titulo}</td>  
        `;

      row.appendChild(th_detalle);
    

        tabla.appendChild(row);
    });

  }

  sincronizarLista(lista){
    sessionStorage.setItem('transferencias', JSON.stringify(lista));
  } 


  limpiarTabla(){}
}


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
                UI.sincronizarLista(transferenciasLista);
                
              })
              .catch(function (error) {
                console.log(error);
              })
  
}


function eventListeners(){

  const ordenar = document.querySelector('#ordenar');

  ordenar.addEventListener('click', ordenarPorFechaAsc);


}


function convertirStringADate(fechaObj){
  var nueva=fechaObj.split('/');
  dd = nueva[0];
  mm = nueva[1]-1;
  yyyy = nueva[2];
  let fecha = new Date(yyyy,mm,dd).toLocaleDateString();
  return fecha;
}


function ordenarPorFechaAsc(){

  listaAsc = transferenciasLista.sort(function (a, b) {
      if (a.fecha > b.fecha) {
        return 1;
      }
      if (a.fecha < b.fecha) {
        return -1;
      }
      return 0;
    });

    limpiarTabla();
    UI.llenarTabla(listaAsc)


}


