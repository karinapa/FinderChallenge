var json = "";

function searchForm() {
    // code here

    consultarJson = function() {
        var xmlhttp = new XMLHttpRequest();
        var url = "../../books-schema.json";
        var myArr = "";
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                myArr = JSON.parse(this.responseText);
                json = myArr;
                menu();
                setearValoresBusqueda();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();


    };
    consultarJson();

    modificar = function(event, tru) {
        console.log(tru);
        var input = document.querySelector('#input_buscar');
        var button = document.querySelector('#button_buscar');
        var digitos = input.value.length;

        if (digitos >= 2) {
            button.classList.add("active");
            var key = event.which || event.keyCode;
            if (key == "13" || tru) {
                filtrarDatosTitulo(input.value);
            }

        } else {
            button.classList.remove("active");
        }
    };

    buscar = function() {
        mostrarTabla(json);
    }


    menu = function() {
        mostrarSubmenu(json, 'submenu-categories', 'categories');
        mostrarSubmenu(json, 'submenu-idiomas', 'lang');
        mostrarSubmenu(json, 'submenu-edicion', 'edition');
    }

    setearValoresBusqueda = function() {
        var inputBusqueda = document.getElementById('input_buscar')
        var out = "";
        for (i = 0; i < json.data.length; i++) {
            if (i != 0) {
                out += ','
            }
            out += json.data[i].title;

        }
        inputBusqueda.setAttribute('data-list', out);
    };

    function mostrarTabla(arr) {
        var out = "";
        var i;
        for (i = 0; i < 9; i++) {
            var rowBusqueda = document.getElementById('row-busqueda')
            out += formatoTabla(arr, i);
        }
        rowBusqueda.innerHTML = out;
    }

    function mostrarSubmenu(arr, id, entitiesType) {
        if (arr) {
            var out = "";
            var i;
            var rowBusqueda = document.getElementById(id)
            out += '<li><a onclick="filtrarDatos(event)" entitiesType=' + entitiesType + '>Todos</a></li>';

            if (entitiesType == "categories") {
                for (i = 0; i < arr.entities.categories.length; i++) {
                    out += formatoSubMenu(arr, entitiesType, i);
                }
            } else if (entitiesType == "lang") {
                for (i = 0; i < arr.entities.lang.length; i++) {
                    out += formatoSubMenu(arr, entitiesType, i);
                }
            } else if (entitiesType == "edition") {
                for (i = 0; i < arr.entities.edition.length; i++) {
                    out += formatoSubMenu(arr, entitiesType, i);
                }
            }
            rowBusqueda.innerHTML = out;
        };


    }


    function formatoSubMenu(arr, entitiesType, i) {

        if (entitiesType == "categories") {
            return '<li><a onclick="filtrarDatos(event)" class="aOption" entitiesType=' + entitiesType + ' entities=' + arr.entities.categories[i].descripcion + ' >' + arr.entities.categories[i].label + '</a></li>';

        } else if (entitiesType == "lang") {
            return '<li><a onclick="filtrarDatos(event)" class="aOption" entitiesType=' + entitiesType + ' entities=' + arr.entities.lang[i].id + ' >' + arr.entities.lang[i].label + '</a></li>';

        } else if (entitiesType == "edition") {
            return '<li><a onclick="filtrarDatos(event)" class="aOption" entitiesType=' + entitiesType + ' entities=' + arr.entities.edition[i].id + ' >' + arr.entities.edition[i].label + '</a></li>';
        }


    }


    function filtrarDatosTitulo(value) {
        var rowBusqueda = document.getElementById('row-busqueda');
        var out = "";
        for (i = 0; i < json.data.length; i++) {
            var x = json.data[i].title.toLowerCase().indexOf(value.toLowerCase())
            if (json.data[i].title && x >= 0) {
                out += formatoTabla(json, i);

            }
        }
        rowBusqueda.innerHTML = out;
    }

}

function formatoTabla(arr, i) {

    var tabla = '<div class="col-md-4 pt-15"><div><img src=' + arr.data[i].image + '></div><h3>' + arr.data[i].title + '</h3><p>' + arr.data[i].teaser +
        '</p><table class="table"><thead><tr><th scope ="col"> Categoría </th> <td scope = "col" > ' + arr.data[i].categories + ' </td> </tr> ' +
        '</thead> <tbody><tr><th scope = "row" > Idiomas</th> <td >' + arr.data[i].lang + '</td> </tr> </tbody> </table></div > ';

    return tabla;
}


function filtrarDatos(e) {
    var entities = e.target.getAttribute("entities");
    var entitiesType = e.target.getAttribute("entitiesType");
    var myArr = json;

    var rowBusqueda = document.getElementById('row-busqueda');
    var out = '';
    var cont = 0;

    for (i = 0; i < myArr.data.length; i++) {

        if (entities != null) {
            if (entitiesType == "categories") {
                if ((myArr.data[i].categories[0] == entities) && cont <= 8) {
                    out += formatoTabla(myArr, i);
                    cont++;
                }
            } else if (entitiesType == "lang") {
                if ((myArr.data[i].lang[0] == entities || myArr.data[i].lang[1] == entities) && (cont <= 8)) {
                    out += formatoTabla(myArr, i);
                    cont++;
                }
            } else if (entitiesType == "edition") {
                if ((myArr.data[i].mode[0] == entities || myArr.data[i].mode[1] == entities) && (cont <= 8)) {
                    out += formatoTabla(myArr, i);
                    cont++;
                }
            }
        } else {

            if (entitiesType == "date_pub") {
                console.log(myArr.data[i].date_pub);
                var str = myArr.data[i].date_pub;
                var res = str.split("/");
                var dia = res[0];
                var mes = res[0];
                var annio = res[0];

                var f = new Date();
                console.log(f.getDate() + " de " + f.getMonth() + " de " + f.getFullYear());

                console.log(res);
                if ((cont <= 8)) {
                    out += formatoTabla(myArr, i);
                    cont++;
                }
            } else {
                out += formatoTabla(myArr, i);
                cont++;
            }

        }
    }

    rowBusqueda.innerHTML = out;
}