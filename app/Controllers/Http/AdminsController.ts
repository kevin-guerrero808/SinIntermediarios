import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Admin from "App/Models/Admin"

export default class AdminsController {
	public async index(ctx: HttpContextContract) {
		let admins: Admin[] = await Admin.query()
		return admins
	}
	public async store({ auth, request, response }: HttpContextContract) {
		const schemaPayload = schema.create({
			first_name: schema.string(),
			last_name: schema.string(),
			url_photo: schema.string.optional(),
			phone: schema.string.optional(),
			url_facebook: schema.string.optional(),
			url_instagram: schema.string.optional(),
		})
		const userSchemaPayload = schema.create({
			name: schema.string.optional(),
			email: schema.string.optional([
				rules.email()
			]),
			password: schema.string()
		})

		const payload = await request.validate({ schema: schemaPayload })
		const userPayload = await request.validate({ schema: userSchemaPayload })

		if (auth.user!.admin) {
			response.badRequest({ error: 'Admin already confirmed' })
		}
		const admin: Admin = await Admin.create(payload)
		await (auth.user?.merge(userPayload))?.save()
		await auth.user?.related('admin').save(admin)
		
		return admin
	}
	public async show({ params }: HttpContextContract) {
		const admin = await Admin.findOrFail(params.id)

		return admin;
	}
	public async update({  params, request }: HttpContextContract) {
		const schemaPayload = schema.create({
			first_name: schema.string.optional(),
			last_name: schema.string.optional(),
			url_photo: schema.string.optional(),
			phone: schema.string.optional(),
			url_facebook: schema.string.optional(),
			url_instagram: schema.string.optional(),
		})
		const payload = await request.validate({ schema: schemaPayload })

		const admin = await Admin.findOrFail(params.id)

		admin.merge(payload);
		return admin.save()
	}
	public async destroy({ params }: HttpContextContract) {
		const admin: Admin = await Admin.findOrFail(params.id)
		return admin.delete()
	}
}
