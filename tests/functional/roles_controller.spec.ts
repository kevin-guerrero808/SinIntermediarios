import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Role from 'App/Models/Role'

test.group('Roles controller', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()

  })

  test('get roles', async ({client}) => {
    const response = await client.get('/roles')

    response.assertAgainstApiSpec()
  })
  test('post roles', async ({client}) => {
    const response = await client.post('/roles')

    response.assertAgainstApiSpec()
  })
  test('get one permission', async ({client}) => {
    const response = await client.get('/roles/1')

    response.assertAgainstApiSpec()
  })
  test('put roles', async ({client}) => {
    const response = await client.put('/roles/1')

    response.assertAgainstApiSpec()
  })
  test('delete roles', async ({client}) => {
    const response = await client.delete('/roles/1')

    response.assertAgainstApiSpec()
  })
  test('delete roles without asociate users', async ({client}) => {
    const role = await Role.create({
      name: 'player',
      
    })
    const response = await client.delete(`/roles/${role.id}`)

    response.assertAgainstApiSpec()
  })
})
