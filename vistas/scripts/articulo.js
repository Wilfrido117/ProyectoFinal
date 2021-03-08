var tabla;

//Funcion que se ejecute al inicio

function init(){
    mostrarform(false);
    listar();
    
    $("#formulario").on("submit",function(e)
    {
            guardaryeditar(e); 
        });
  $.post("../ajax/articulo.php?op=selectCategoria", function(r){
   $("#idcategoria").html(r);   
   $("#idcategoria").selectpicker('refresh');   
  })  
}

//funcion limpiar

function  limpiar(){
    $("#codigo").val("");
    $("#nombre").val(" ");
    $("#descripcion").val(" ");
    $("#stock").val(" ");

    
}

// funcion mostrar formulario

function mostrarform(flag)

{
    limpiar();
    if(flag){
        
$("#listadoregistros").hide();
$("#formularioregistros").show();
$("#btnGuardar").prop("disabled",false);
$("#btnagregar").hide();
        
    }else{
        
$("#listadoregistros").show();
$("#formularioregistros").hide();
    }
    
}

function cancelarform(){
    
    limpiar();
    mostrarform(false);
}

// funcion listar

//Función Listar
function listar()
{
	tabla=$('#tbllistado').dataTable(
	{
            "aProcessing": true,//Activamos el procesamiento del datatables
	    "aServerSide": true,//Paginación y filtrado realizados por el servidor
	    dom: 'Bfrtip',//Definimos los elementos del control de tabla
	    buttons: [		          
		            'copyHtml5',
		            'excelHtml5',
		            'csvHtml5',
		            'pdf'
		        ],
		"ajax":
				{
					url: '../ajax/articulo.php?op=listar',
					type : "get",
					dataType : "json",						
					error: function(e){
						console.log(e.responseText);	
					}
				},
		"bDestroy": true,
		"iDisplayLength": 5,//Paginación
	    "order": [[ 0, "desc" ]]//Ordenar (columna,orden)
	}).DataTable();
}
function guardaryeditar(e)
{
	e.preventDefault(); //No se activarÃ¡ la acciÃ³n predeterminada del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);

	$.ajax({
		url: "../ajax/articulo.php?op=guardaryeditar",
	    type: "POST",
	    data: formData,
	    contentType: false,
	    processData: false,

	    success: function(datos)
	    {                    
	          bootbox.alert(datos);	          
	          mostrarform(false);
	          tabla.ajax.reload();
	    }

	});
	limpiar();
}

function mostrar(idarticulo){
    $.post("../ajax/articulo.php?op=mostrar",{idarticulo:idarticulo}, function(data, status)
    {
        data = JSON.parse(data);
        mostrarform(true);
        $("#idcategoria").val(data.idcategoria);
        $("#codigo").val(data.codigo);
        $("#nombre").val(data.nombre);
        $("#stock").val(data.stock);
        $("#descripcion").val(data.descripcion);
        $("#idarticulo").val(data.idarticulo);
    });
    }
//funcion para desactivar articulo
function desactivar(idarticulo){
    bootbox.confirm("¿Esta seguro de querer desactivar la articulo?", function(result){
        if (result){
            $.post("../ajax/articulo.php?op=desactivar",{idarticulo:idarticulo}, function(e){
            bootbox.alert(e);
            tabla.ajax.reload();
            });
        }
    });
}
//funcion para activar articulo
function activar(idarticulo){
    bootbox.confirm("¿Esta seguro de querer activar la articulo?", function(result){
        if (result){
            $.post("../ajax/articulo.php?op=activar",{idarticulo:idarticulo}, function(e){
            bootbox.alert(e);
            tabla.ajax.reload();
            });
            
        }
    });
}

init();

