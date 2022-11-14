import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Role from 'App/Models/Role'
import User from 'App/Models/User';

test.group('Roles controller', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()

  })

  test('get roles', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.get('/roles').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('post roles', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.post('/roles').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('get one role', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.get('/roles/1').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('put roles', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.put('/roles/1').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('delete roles', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.delete('/roles/1').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('delete roles without asociate users', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const role = await Role.create({
      name: 'player',
      
    })
    const response = await client.delete(`/roles/${role.id}`).loginAs(user)

    response.assertAgainstApiSpec()
  })
})
