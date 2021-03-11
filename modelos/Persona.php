<?php

//Incluímos inicialmente la conexión a la base de datos
require "../config/Conexion.php";

Class Persona
{
	//Implementamos nuestro constructor
	public function __construct()
	{

	}

	//Implementamos un método para insertar registros
	public function insertar($tipopersona,$nombre,$tipodocumento,$numdocumento,$direccion,$telefono,$email)
	{
		$sql="INSERT INTO persona (tipo_persona,nombre,tipo_documento,num_documento,direccion,telefono,email,Condicion)
                    VALUES ('$tipopersona','$nombre','$tipodocumento','$numdocumento','$direccion','$telefono','$email','1')";
		return ejecutarConsulta($sql);
	}

	//Implementamos un método para editar registros
	public function editar($idpersona,$tipopersona,$nombre,$tipodocumento,$numdocumento,$direccion,$telefono,$email)
	{
		$sql="UPDATE persona SET tipo_persona='$tipopersona',nombre='$nombre',tipo_documento='$tipodocumento',
                    num_documento='$numdocumento',direccion='$direccion',telefono='$telefono',email='$email' WHERE idpersona = '$idpersona'";
		
		return ejecutarConsulta($sql);
	}


	//Implementar un método para mostrar los datos de un registro a modificar
	public function mostrar($idpersona)
	{
		$sql="SELECT * FROM persona WHERE idpersona='$idpersona'";
		return ejecutarConsultaSimpleFila($sql);
	}

        //Implementamos un método para eliminar personas
	public function eliminar($idpersona)
	{
		$sql="DELETE FROM persona WHERE idpersona='$idpersona'";
		return ejecutarConsulta($sql);
	}
}