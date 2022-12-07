import Env from '@ioc:Adonis/Core/Env'

export default class SecurityTemplate {
    newLogin(){
        let html="<p>Se ha registrado un nuevo inicio de sesión</p>";
        return html;
    }
    newUser(token, role){
        let html=`<p>Wellcome to SinIntermediarios, complete the information on <a href="${Env.get('URL_FRONTEND')}/pages/security/complete-profile?role=${role}&token=${token}">here</a></p>`;
        return html;
    }
    forgotPassword(token, role){
        let html="<h1>Sistema Demo-Adonis</h1>";

        html+="<p>Para solicitar el restablecimiento de su contraseña ingrese  <a href='"+Env.get('URL_FRONTEND')+"/security/change-password?role="+role+"&token="+token+"'>aquí</a></p>";
        //html+="<p>Token:"+token+"</p>"
        return html;
    }
    resetPassword(token, role){
        let html="<h1>Sistema Demo-Adonis</h1>";
        html+="<p>Para cambiar su contraseña ingrese <a href='"+Env.get('URL_FRONTEND')+"/security/change-password?role="+role+"&token="+token+"'>aquí</a></p>";
        //html+="<p>Token:"+token+"</p>"
        return html;
    }
}
