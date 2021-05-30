
addEventListeners()


function addEventListeners(){
    document.addEventListener('DOMContentLoaded',()=>{
            
        let nombre = sessionStorage.getItem('Nombre'),
            apellido  = sessionStorage.Apellido
            document.write(nombre)
            document.write(apellido)
            
    })
}