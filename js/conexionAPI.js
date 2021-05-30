
function consultarUsuario(usuario){

    fetch('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/db')
        .then(function(response) {
         return response.text();
     })
     .then(function(data) {
         console.log('data = ', data);
     })
     .catch(function(err) {
         console.error(err);
     });
    
    }