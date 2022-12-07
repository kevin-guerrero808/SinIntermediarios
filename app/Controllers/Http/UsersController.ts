import Encryption from '@ioc:Adonis/Core/Encryption'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import generator from 'generate-password';
import Profile from 'App/Models/Profile';
import User from 'App/Models/User';
import SecurityTemplate from 'App/Services/EmailTemplates/SecurityTemplate';
import EmailService from 'App/Services/EmailService';
import Role from 'App/Models/Role';
import { roles } from 'App/enums/roles';
export default class UsersController {
    /**
    * Lista todos los usuarios
    */
    public async index(ctx:HttpContextContract){
        let users:User[]=await
        User.query().preload('farmer')
        return users;
    }

   /**
    * Almacena la información de un usuario
    */
    public async store({ auth, request, response}:HttpContextContract){
        const schemaPayload = schema.create({
            email: schema.string([
                rules.email()
            ]),
            password: schema.string.optional(),
            id_role: schema.number(),
        })
        const payload = await request.validate({ schema: schemaPayload })
        const existingUser: User[] = await User.query().where('email',payload.email)
        if (existingUser && existingUser[0]) {
            response.badRequest({ error: 'Email already exist' })
        }
        payload.password = payload.password ?? generator.generate({
            length: 10,
            numbers: true,
            symbols: true
        });
        const newUser : User =await User.create(payload);
        await newUser.load('role')
        //Generación token
        const token = await auth.use('api').generate(newUser, {
            expiresIn: '44640 mins' // 31 daies
        })
        let plantilla_email: SecurityTemplate = new SecurityTemplate()
        let html = plantilla_email.newUser(token.token, newUser.role.name)
        let el_servicio_email: EmailService = new EmailService();
        el_servicio_email.sendEmail(payload.email, "Complete register", html)
        return newUser;
    }

    /**
     * Almacena la información de un usuario consumer
     */
     public async storeConsumer({ auth, request, response}:HttpContextContract){
        const customerId: number = (await Role.query().where('name', roles.CONSUMER))[0].id;
        request.updateBody({...request.body(), id_role: customerId});
        console.log(request.body())
        return await this.store({ auth, request, response } as HttpContextContract)
     }
    /**
    * Muestra la información de un solo usuario
    */
    public async show({bouncer, params}:HttpContextContract) {
        let el_usuario=(await
        User.query().where('id',params.id).preload('farmer'))[0];
        
        await bouncer
        .with('UserPolicy')
        .authorize('view', el_usuario)

        return el_usuario;
    }

    /**
    * Actualiza la información de un usuario basado
    * en el identificador y nuevos parámetros
    */
    public async update({request, bouncer, params}:HttpContextContract) {
        const schemaPayload = schema.create({
            email: schema.string([
                rules.email()
            ]),
            id_role: schema.number(),
        })
        const payload = await request.validate({ schema: schemaPayload })
        const user = await User.findOrFail(params.id)

        await bouncer
        .with('UserPolicy')
        .authorize('update', user)

        user.merge(payload);
        return user.save();
    }

    /**
    * Elimina a un usuario basado en el identificador
    */
    public async destroy({bouncer, params}:HttpContextContract) {
        const user = await User.findOrFail(params.id)

        await bouncer
        .with('UserPolicy')
        .authorize('delete', user)

        return user.delete();
    }
}