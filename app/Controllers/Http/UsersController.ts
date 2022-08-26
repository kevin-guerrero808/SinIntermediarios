import Encryption from '@ioc:Adonis/Core/Encryption'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
export default class UsersController {
/**
* Lista todos los usuarios
*/
public async index(ctx:HttpContextContract){
    return User.all();
}
/**
* Almacena la información de un usuario
*/

public async store({request}:HttpContextContract){
    const body=request.body();
    body.contrasena=Encryption.encrypt(body.contrasena);
    const nuevo_usuario=await User.create(body);
    return nuevo_usuario;
}
/**
* Muestra la información de un solo usuario
*/
public async show({params}:HttpContextContract) {
return {
"mensaje": "mostrando al usuario con id="+params.id
}
}
/**
* Actualiza la información de un usuario basado
* en el identificador y nuevos parámetros
*/
public async update({params,request}:HttpContextContract) {
return {
"mensaje": "modificando al usuario con id="+params.id,
"nueva_informacion":request.body()
}
}
/**
* Elimina a un usuario basado en el identificador
*/
public async destroy({params}:HttpContextContract) {
return {
"mensaje": "eliminando al usuario con id="+params.id
}
}
}