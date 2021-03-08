<?php 
//Incluímos inicialmente la conexión a la base de datos
require "../config/Conexion.php";

Class Permiso
{
	public function __construct()
	{

	}
	//Implementar un método para listar los permisos
	public function listar()
	{
		$sql="SELECT * FROM permiso";
		return ejecutarConsulta($sql);		
	}
        
}

?>