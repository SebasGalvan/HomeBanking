datos= JSON.parse(sessionStorage.getItem('datos'))

if  (datos == null ) {
  location.replace('../paginas/401.html')
}

if((datos.usuario==null) && (datos.password==null)){
  location.replace('../paginas/401.html');
}

axios.get('https://my-json-server.typicode.com/SebasGalvan/HomeBanking/tarjetas', {
          })
          .then(function (response) {
            let tarjetas = response.data;
            sessionStorage.setItem('tarjetas', JSON.stringify(tarjetas));
          })
          .catch(function (error) {
            console.log(error);
          })

const contenido = document.querySelector("#contenido");

listaTarjetas =  JSON.parse(sessionStorage.getItem("tarjetas"))

listaTarjetas.forEach(t => {
    

     const contenedor_tarjeta =  document.createElement("div");
     contenedor_tarjeta.classList="tarjeta";

     const tarjeta =  document.createElement("div");
     tarjeta.classList=  t.tipo ;

     for(const r in t){
      
        const tarjeta_div =  document.createElement("div");
        tarjeta_div.classList="tarjeta_div"
        const etiqueta_tarjeta = document.createElement("p");
        etiqueta_tarjeta.textContent = r
        const tarjetaContenido = document.createElement("p");
        tarjetaContenido.textContent= t[r];
        tarjeta_div.appendChild(etiqueta_tarjeta);
        tarjeta_div.appendChild(tarjetaContenido);
        tarjeta.appendChild(tarjeta_div)
        contenedor_tarjeta.appendChild(tarjeta)
     }

contenido.appendChild(contenedor_tarjeta)

});


