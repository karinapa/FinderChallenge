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
                mostrarCategoria(myArr);
                mostrarIdiomas(myArr);
                mostrarEdicion(myArr);
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

    function mostrarCategoria(arr) {
        var out = "";
        var i;
        var rowBusqueda = document.getElementById('submenu-categories')
        out += '<li><a>Todos</a></li>';
        for (i = 0; i < arr.entities.categories.length; i++) {
            console.log(arr.entities.categories.length);
            out += '<li><a>' + arr.entities.categories[i].label + '</a></li>';
        }
        rowBusqueda.innerHTML = out;
    }

    function mostrarIdiomas(arr) {
        var out = "";
        var i;
        out += '<li><a>Todos</li>';
        var rowIdiomas = document.getElementById('submenu-idiomas')

        for (i = 0; i < arr.entities.lang.length; i++) {
            console.log(arr.entities.lang.length);
            out += '<li><a>' + arr.entities.lang[i].label + '</a></li>';
        }
        rowIdiomas.innerHTML = out;
    }

    function mostrarEdicion(arr) {
        var out = "";
        var i;
        out += '<li><a>Todos</li>';
        var rowedicion = document.getElementById('submenu-edicion')

        for (i = 0; i < arr.entities.edition.length; i++) {
            console.log(arr.entities.edition.length);
            out += '<li><a>' + arr.entities.edition[i].label + '</a></li>';
        }
        rowedicion.innerHTML = out;

    }

}