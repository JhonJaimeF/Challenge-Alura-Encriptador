function validarTexto(event) {
    const pattern = /^[a-zA-Z\s]*$/;
    const currentValue = event.target.value;

    if (!pattern.test(currentValue)) {
        event.target.value = currentValue.replace(/[^a-zA-Z\s]/g, '');
    }
}

function asginarTextoElemento(idElemento,texto){
    let elementoHtml = document.getElementById(idElemento);
        if (elementoHtml) {
            elementoHtml.textContent = texto;
        } else {
            console.error(`El elemento con ID "${idElemento}" no existe.`);
        }
}

function cambioPresentacionMostrarTexto(){

    document.getElementById('boton__copiar').style.display = 'block';
    document.getElementById('mostrar__muñeco').style.display = 'none';
    document.getElementById("container__presentacion").style.justifyContent='space-between';
}

// bloque de funciones para encriptar un texto
function encriptarCadena(){

    let cadena = document.getElementById('input__text').value;
    let cadenaMinusculas = cadena.toLowerCase();

    if (cadena.length>0) {

        let listaPalabras = cadenaMinusculas.split(' ');
        let cadenaEncriptada = "";

    for (let index = 0; index < listaPalabras.length; index++) {
        let listaLetras = modificarletraDesencriptada(listaPalabras[index]);
        cadenaEncriptada+=listaLetras + " ";
    } 
    
    cambioPresentacionMostrarTexto();
    asginarTextoElemento("print__text",cadenaEncriptada);

    }else{
        alert("Debe Digitar texto");
    }
}

function modificarletraDesencriptada(palabra) {
    // Mapeo de letras a sus reemplazos
    const reemplazos = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat"
    };

    let palabraE = "";

    for (let index = 0; index < palabra.length; index++) {
        let letra = palabra[index];
        palabraE += reemplazos[letra] || letra;
    }

    return palabraE;
}

// bloque de funciones para Desencriptar un texto

function desencriptarCadena(){
    let cadena = document.getElementById('input__text').value;
    let cadenaMinusculas = cadena.toLowerCase();

    if(cadena.length>0){

    let listaPalabras = cadenaMinusculas.split(' ');
    let cadenaDesencriptada = "";

    for (let index = 0; index < listaPalabras.length; index++) {
        let listaLetras = modificarletraEncriptada(listaPalabras[index]);
        cadenaDesencriptada+=listaLetras + " ";
    }
    
    cambioPresentacionMostrarTexto();

    asginarTextoElemento("print__text",cadenaDesencriptada);

    

    }else{
        alert("Debe Digitar texto");
    }
}

function modificarletraEncriptada(palabra){
    let subcadenas = ["ai","enter","imes","ober","ufat"]

    let desenciptarLetra_a= remplazarCadena(palabra,contarSubcadena(palabra,subcadenas[0]),subcadenas[0],"a");
    let desenciptarLetra_e= remplazarCadena(desenciptarLetra_a,contarSubcadena(desenciptarLetra_a,subcadenas[1]),subcadenas[1],"e");
    let desenciptarLetra_i= remplazarCadena(desenciptarLetra_e,contarSubcadena(desenciptarLetra_e,subcadenas[2]),subcadenas[2],"i");
    let desenciptarLetra_o= remplazarCadena(desenciptarLetra_i,contarSubcadena(desenciptarLetra_i,subcadenas[3]),subcadenas[3],"o");
    let palabraDesencriptada= remplazarCadena(desenciptarLetra_o,contarSubcadena(desenciptarLetra_o,subcadenas[4]),subcadenas[4],"u");

    return palabraDesencriptada;

}

function contarSubcadena(palabra, subcadena) {
    const ocurrencias = palabra.split(subcadena).length - 1;
    return ocurrencias;
}

function remplazarCadena(palabra, ocurrencia, subcadena, nuevaCadena) {
        let cadenaremplzada = palabra;
    for (let index = 0; index < ocurrencia; index++) {
        cadenaremplzada = cadenaremplzada.replace(subcadena, nuevaCadena);
    }
    return cadenaremplzada;
}

//Bloque de funcion de copiar texto

function copiarTexto(){
    let parrafo = document.getElementById('print__text').innerText;

    // Usar la Clipboard API para copiar el texto
    navigator.clipboard.writeText(parrafo)
        .then(() => {
            // Avisar al usuario que el texto fue copiado
            alert('Texto copiado al portapapeles');
        })
        .catch(err => {
            // Avisar si ocurre algún error
            console.error('Algo salió mal al copiar el texto: ', err);
        });
}