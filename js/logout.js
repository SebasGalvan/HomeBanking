function cerrarSesion(){
    sessionStorage.removeItem("datos");
    sessionStorage.removeItem('transferencias');
    location.replace('../index.html');
}