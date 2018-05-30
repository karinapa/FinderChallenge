function searchForm() {
    // code here

    modificar = function() {

        var input = document.querySelector('#input_buscar');
        var button = document.querySelector('#button_buscar');


        var digitos = input.value.length;

        if (digitos >= 2) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    };

    buscar = function() {
        var xmlhttp = new XMLHttpRequest();
        var url = "../../books-schema.json";

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                mostrarTabla(myArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }


    menu = function() {
        var xmlhttp = new XMLHttpRequest();
        var url = "../../books-schema.json";

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                mostrarSubmenu(myArr, 'submenu-categories', 'categories');
                mostrarSubmenu(myArr, 'submenu-idiomas', 'lang');
                mostrarSubmenu(myArr, 'submenu-edicion', 'edition');
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    menu();

    function mostrarTabla(arr) {
        var out = "";
        var i;
        console.log(arr);
        for (i = 0; i < 9; i++) {
            var rowBusqueda = document.getElementById('row-busqueda')
            out += '<div class="col-md-4"><div><img src=""></div><h3>' + arr.data[i].title + '</h3><p>' + arr.data[i].teaser + '</p></div>';
        }
        rowBusqueda.innerHTML = out;
    }

    function mostrarSubmenu(arr, id, entitiesType) {
        var out = "";
        var i;
        var rowBusqueda = document.getElementById(id)
        out += '<li><a>Todos</a></li>';

        if (entitiesType = "categories") {
            for (i = 0; i < arr.entities.categories.length; i++) {
                console.log(arr.entities.categories.length);
                out += '<li><a  onclick="filtrarDatos(event)" class="aOption" entitiesType=' + entitiesType + ' entities=' + arr.entities.categories[i].id + ' >' + arr.entities.categories[i].label + '</a></li>';
            }
        } else if (entitiesType = "lang") {
            for (i = 0; i < arr.entities.lang.length; i++) {
                console.log(arr.entities.lang.length);
                out += '<li><a onclick="filtrarDatos(event)" class="aOption" entitiesType=' + entitiesType + ' entities=' + arr.entities.lang[i].id + ' >' + arr.entities.lang[i].label + '</a></li>';
            }
        } else if (entitiesType = "edition") {

            for (i = 0; i < arr.entities.edition.length; i++) {
                console.log(arr.entities.edition.length);
                out += '<li><a onclick="filtrarDatos(event)" class="aOption" entitiesType=' + entitiesType + ' entities=' + arr.entities.edition[i].id + ' >' + arr.entities.edition[i].label + '</a></li>';
            }
        }

        rowBusqueda.innerHTML = out;
    }


};

function filtrarDatos(e) {
    alert(e.target.getAttribute("entities"));
    var entitiesType = e.target.getAttribute("entitiesType");
    var entities = e.target.getAttribute("entities");

    var xmlhttp = new XMLHttpRequest();
    var url = "../../books-schema.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);

            var obj = '';
            if (entitiesType = "categories") {
                obj = myArr.entities.categories;
            } else if (entitiesType = "lang") {
                obj = myArr.entities.lang;
            } else if (entitiesType = "edition") {
                obj = myArr.entities.edition;
            }

            for (i = 0; i < obj; i++) {
                console.log(obj.length);
                out += '<li><a onclick="filtrarDatos(event)" class="aOption" entitiesType=' + entitiesType + ' entities=' + arr.entities.edition[i].id + ' >' + arr.entities.edition[i].label + '</a></li>';
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();




}

function ajaxRetun() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../../books-schema.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            return myArr;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}