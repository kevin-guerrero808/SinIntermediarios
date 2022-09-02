import Encryption from '@ioc:Adonis/Core/Encryption'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile';
import User from 'App/Models/User';
export default class UsersController {
    /**
    * Lista todos los usuarios
    */
    public async index(ctx:HttpContextContract){
        let users:User[]=await
        User.query().preload('role').preload('profile')
        return users;
    }

   /**
    * Almacena la información de un usuario
    */
    public async store({request}:HttpContextContract){
        const body=request.body();
        body.password=Encryption.encrypt(body.password);
        const nuevo_usuario:User=await User.create(body);
        return nuevo_usuario;
    }
    /**
    * Muestra la información de un solo usuario
    */
    public async show({params}:HttpContextContract) {
        let el_usuario=await
        User.query().where('id',params.id).preload('profile');
        return el_usuario;
    }

    /**
    * Actualiza la información de un usuario basado
    * en el identificador y nuevos parámetros
    */
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const el_usuario:User=await User.findOrFail(params.id);
        el_usuario.name=body.name;
        el_usuario.email=body.email;
        el_usuario.password=Encryption.encrypt(body.password);
        el_usuario.id_role=body.id_role;
        if(body.perfil){
            body.perfil.id_user=params.id;
            await this.setPerfil(body.perfil);
        }
        return el_usuario.save();
    }

    public async setPerfil(profile_info){
        const profile_user=await
        Profile.findBy('id_user',profile_info.id_user );
        if(profile_user){
            profile_user.cellphone=profile_info.cellphone;
            profile_user.url_facebook=profile_info.url_facebook;
            profile_user.url_instagram=profile_info.url_instagram;
            profile_user.save();
        }else{
            await Profile.create(profile_info);
        }
    }

    /**
    * Elimina a un usuario basado en el identificador
    */
    public async destroy({params}:HttpContextContract) {
        const user:User=await User.findOrFail(params.id);
        return user.delete();
    }
}