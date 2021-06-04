function cerrarSesion(){
    sessionStorage.removeItem("Nombre");
    sessionStorage.removeItem("Apellido");
    sessionStorage.removeItem('transferencias');
    location.replace('../index.html');
}