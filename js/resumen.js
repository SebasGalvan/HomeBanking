
let transferenciasLista = [];

class UIResumen{




  llenarTabla(){

    const tabla =  document.querySelector("#tabla__resumen")
    transferenciasLista.forEach(t => {
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

  sincronizarLista(){
    sessionStorage.setItem('transferencias', JSON.stringify(transferenciasLista));
  } 
}


UI = new UIResumen();

inicio();
function inicio() { 
    let transferencias;
    axios.get('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/transferencias', {
              })
              .then(function (response) {
                transferencias =  response.data;
                console.log(transferencias);
                transferenciasLista = transferencias.slice();
                UI.llenarTabla();
                UI.sincronizarLista();
                
              })
              .catch(function (error) {
                console.log(error);
              })
  
}


