var tabla;
//Funcion que se ejecute al inicio
function init() {
    mostrarform(false);
    listar();

    $("#formulario").on("submit", function (e)
    {
        guardaryeditar(e);
    });
}
//funcion limpiar
function  limpiar() {
    $("#idpersona").val("");
    $("#tipo_persona").val(" ");
    $("#nombre").val(" ");
    $("#tipo_documento").val(" ");
    $("#num_documento").val(" ");
    $("#direccion").val(" ");
    $("#telefono").val(" ");
    $("#email").val(" ");
}
// funcion mostrar formulario
function mostrarform(flag)
{
    limpiar();
    if (flag) {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled", false);

    } else {

        $("#listadoregistros").show();
        $("#formularioregistros").hide();
    }
}
function cancelarform() {

    limpiar();
    mostrarform(false);
}
//Función Listar
function listar()
{
    tabla = $('#tbllistado').dataTable(
            {
                "aProcessing": true, //Activamos el procesamiento del datatables
                "aServerSide": true, //Paginación y filtrado realizados por el servidor
                dom: 'Bfrtip', //Definimos los elementos del control de tabla
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdf'
                ],
                "ajax":
                        {
                            url: '../ajax/persona.php?op=listar',
                            type: "get",
                            dataType: "json",
                            error: function (e) {
                                console.log(e.responseText);
                            }
                        },
                "bDestroy": true,
                "iDisplayLength": 5, //Paginación
                "order": [[0, "desc"]]//Ordenar (columna,orden)
            }).DataTable();
}
function guardaryeditar(e)
{
    e.preventDefault(); //No se activarÃ¡ la acciÃ³n predeterminada del evento
    $("#btnGuardar").prop("disabled", true);
    var formData = new FormData($("#formulario")[0]);

    $.ajax({
        url: "../ajax/persona.php?op=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos)
        {
            bootbox.alert(datos);
            mostrarform(false);
            tabla.ajax.reload();
        }

    });
    limpiar();
}

function mostrar(idpersona) {
    $.post("../ajax/persona.php?op=mostrar", {idpersona: idpersona}, function (data, status)
    {
        data = JSON.parse(data);
        mostrarform(true);
        $("#idpersona").val(data.idpersona);
        $("#tipo_persona").val(data.tipo_persona);
        $("#nombre").val(data.nombre);
        $("#tipo_documento").val(data.tipo_documento);
        $("#num_documento").val(data.num_documento);
        $("#direccion").val(data.direccion);
        $("#telefono").val(data.telefono);
        $("#email").val(data.email);
        
    });
}

init();