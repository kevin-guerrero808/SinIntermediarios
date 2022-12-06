import Hash from '@ioc:Adonis/Core/Hash'
import ApiToken from 'App/Models/ApiToken';
import User from "App/Models/User";
import EmailService from 'App/Services/EmailService';
import SecurityTemplate from 'App/Services/EmailTemplates/SecurityTemplate';
import Encryption from '@ioc:Adonis/Core/Encryption'


export default class AuthController {
    async login({ auth, request, response }) {
        const email = request.input('email')
        const password = request.input('password')
        const user = await User.query()
            .where('email', email)
            .firstOrFail()
        if (await Hash.verify(user.password, password)) {
            //Generación token
            const token = await auth.use('api').generate(user, {
                expiresIn: '44640 mins' // 31 daies
            })
            let plantilla_email: SecurityTemplate = new SecurityTemplate()
            let html = plantilla_email.newLogin()
            let el_servicio_email: EmailService = new EmailService();
            el_servicio_email.sendEmail(email, "Nuevo Inicio de Sesión", html)
            //Obtiene los datos correspondientes a la relación
            await user.load("farmer")
            await user.load("consumer")
            await user.load("admin")
            await user.load("role")
            user.password = ""
            return {
                "token": token,
                "user": user
            };
        } else {
            return response.unauthorized('Credenciales inválidas')
        }
    }
    async logout({ auth }) {
        await auth.use('api').revoke()
        return {
            revoked: true
        }
    }
    async forgotPassword({ auth, request }) {
        let respuesta: Object = {}
        const email = request.input('email')
        const user = await User.query()
            .where('email', email)
            .firstOrFail()
        if (!user) {
            respuesta = {
                "status": "error",
                "message": "El email no está registrado en la plataforma"
            }
        } else {
            const token = await auth.use('api').generate(user, {
                expiresIn: '60 mins'
            })
            let plantilla_email: SecurityTemplate = new SecurityTemplate()
            let html = plantilla_email.forgotPassword(token.token)
            let el_servicio_email: EmailService = new EmailService();
            el_servicio_email.sendEmail(email, "Solicitud restablecimiento de contraseña", html)
            respuesta = {
                "status": "success",
                "message": "Revisar el email"
            }
        }
        return respuesta;
    }
    async resetPassword({ auth, request }) {
        let respuesta: Object = {}
        try {
            await auth.use('api').authenticate()
            auth.use('api').isAuthenticated
        } catch (error) {
            return {
                status: "error",
                message: "Token corrupto"
            };
        }
        const user = await User.findBy('email', auth.user!.email);
        if (!user) {
            respuesta = {
                status: "error",
                message: "Este usuario no existe"
            }
        } else {
            user.password = request.input('password');
            await user.save();
            await auth.use('api').revoke();
            respuesta = {
                status: "success",
                message: "La contraseña se ha restaurado correctamente"
            };
        }
        return respuesta;
    }
}

