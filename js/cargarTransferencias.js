
function cargarTransferencias(){
axios.get('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/transferencias', {
              })
              .then(function (response) {
                transferencias =  response.data;
                transferencias.forEach(t => { 
                    t.fecha = convertirStringADate(t.fecha)  
                });
                lista = transferencias.slice();
                sessionStorage.setItem('transferencias', JSON.stringify(lista));
              })
              .catch(function (error) {
                console.log(error);
              })
}

function convertirStringADate(fechaObj){
    var nueva=fechaObj.split('/');
    dd = nueva[0];
    mm = nueva[1]-1;
    yyyy = nueva[2];
    let fecha = new Date(yyyy,mm,dd);
    return fecha;
  }
  
  