// url home https://my-json-server.typicode.com/SebasGalvan/HomeBanking/db

const campoContraseña = document.querySelector('#form__input-contraseña');

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded',()=>{
        console.log("Pasa");
        campoContraseña.hidden = true
    })
}



// fetch('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/db')
// .then(function(response) {
//     return response.text();
// })
// .then(function(data) {
//     console.log('data = ', data);
// })
// .catch(function(err) {
//     console.error(err);
// });

