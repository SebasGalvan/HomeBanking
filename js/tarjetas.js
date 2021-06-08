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
            iniciar();
          })
          .catch(function (error) {
            console.log(error);
          });

function iniciar(){

  const cerrar_sesion = document.querySelector("#cerrarSession")
  cerrar_sesion.addEventListener('click',cerrarSesionResumen);
  
const contenido = document.querySelector("#contenido");

listaTarjetas =  JSON.parse(sessionStorage.getItem("tarjetas"))

listaTarjetas.forEach(t => {
    

        const tarjeta =  document.createElement('div');
        tarjeta.classList = "tarjeta";

        const item__contenedor_tipo =  document.createElement('div');
        item__contenedor_tipo.classList = "item__tarjeta";
        const item__tipo_etiqueta =  document.createElement('p');
        item__tipo_etiqueta.classList = "etiqueta_item"
        item__tipo_etiqueta.textContent = "Tipo: "
        const item__tipo_valor =  document.createElement('p');
        item__tipo_valor.classList = "valor_item";
        item__tipo_valor.textContent = t.tipo;
        tarjeta.classList = "tarjeta " + t.tipo
        item__contenedor_tipo.appendChild(item__tipo_etiqueta);
        item__contenedor_tipo.appendChild(item__tipo_valor);

        const item__contenedor_moneda =  document.createElement('div');
        item__contenedor_moneda.classList = "item__tarjeta";
        const item__moneda_etiqueta =  document.createElement('p');
        item__moneda_etiqueta.classList = "etiqueta_item"
        item__moneda_etiqueta.textContent = "Moneda: "
        const item__moneda_valor =  document.createElement('p');
        item__moneda_valor.classList = "valor_item";
        item__moneda_valor.textContent = t.moneda;
        item__contenedor_moneda.appendChild(item__moneda_etiqueta);
        item__contenedor_moneda.appendChild(item__moneda_valor);

        const item__contenedor_nroTarjeta =  document.createElement('div');
        item__contenedor_nroTarjeta.classList = "item__tarjeta";
        const item__nroTarjeta_etiqueta =  document.createElement('p');
        item__nroTarjeta_etiqueta.classList = "etiqueta_item"
        item__nroTarjeta_etiqueta.textContent = "Numero Tarjeta: "
        const item__nroTarjeta_valor =  document.createElement('p');
        item__nroTarjeta_valor.classList = "valor_item";
        item__nroTarjeta_valor.textContent = t.nroTarjeta;
        item__contenedor_nroTarjeta.appendChild(item__nroTarjeta_etiqueta);
        item__contenedor_nroTarjeta.appendChild(item__nroTarjeta_valor);


        const item__contenedor_fechaAfiliacion =  document.createElement('div');
        item__contenedor_fechaAfiliacion.classList = "item__tarjeta";
        const item__fechaAfiliacion_etiqueta =  document.createElement('p');
        item__fechaAfiliacion_etiqueta.classList = "etiqueta_item"
        item__fechaAfiliacion_etiqueta.textContent = "Fecha Afiliacion: "
        const item__fechaAfiliacion_valor =  document.createElement('p');
        item__fechaAfiliacion_valor.classList = "valor_item";
        item__fechaAfiliacion_valor.textContent = t.fechaAfiliacion;
        item__contenedor_fechaAfiliacion.appendChild(item__fechaAfiliacion_etiqueta);
        item__contenedor_fechaAfiliacion.appendChild(item__fechaAfiliacion_valor);

        const item__contenedor_fechaCaducidad =  document.createElement('div');
        item__contenedor_fechaCaducidad.classList = "item__tarjeta";
        const item__fechaCaducidad_etiqueta =  document.createElement('p');
        item__fechaCaducidad_etiqueta.classList = "etiqueta_item"
        item__fechaCaducidad_etiqueta.textContent = "Fecha Caducidad: "
        const item__fechaCaducidad_valor =  document.createElement('p');
        item__fechaCaducidad_valor.classList = "valor_item";
        item__fechaCaducidad_valor.textContent = t.fechaCaducidad;
        item__contenedor_fechaCaducidad.appendChild(item__fechaCaducidad_etiqueta);
        item__contenedor_fechaCaducidad.appendChild(item__fechaCaducidad_valor);

        tarjeta.appendChild(item__contenedor_tipo);
        tarjeta.appendChild(item__contenedor_moneda);
        tarjeta.appendChild(item__contenedor_nroTarjeta);
        tarjeta.appendChild(item__contenedor_fechaAfiliacion);
        tarjeta.appendChild(item__contenedor_fechaCaducidad);

        const div_logos = document.createElement("div");
        div_logos.classList = "contenedor_logos";

        if (t.tipo =="Visa") {
            const logo = document.createElement('img');
            logo.classList= "logo__tarjeta";
            logo.src = "../img/visa.png";
            div_logos.appendChild(logo);
        } else if(t.tipo == "Mastercard"){
          const logo = document.createElement('img');
          logo.classList = "logo__tarjeta";
          logo.src = "../img/mastercard.png";
          div_logos.appendChild(logo);
        }

        const chipLogo  = document.createElement("img");
        chipLogo.classList = "logo__chip";
        chipLogo.src ="../img/chip.png"
        div_logos.appendChild(chipLogo)

        tarjeta.appendChild(div_logos)

        contenido.appendChild(tarjeta);
});
}

function cerrarSesionResumen() {
  cerrarSesion();
}