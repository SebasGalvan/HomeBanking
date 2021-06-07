function cerrarSesion(){
    sessionStorage.removeItem("datos");
    sessionStorage.removeItem('movimientos');
    sessionStorage.removeItem('tarjetas');
    location.replace('../index.html');
}