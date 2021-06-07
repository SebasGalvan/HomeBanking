function cerrarSesion(){
    sessionStorage.removeItem("datos");
    sessionStorage.removeItem('movimientos');
    location.replace('../index.html');
}