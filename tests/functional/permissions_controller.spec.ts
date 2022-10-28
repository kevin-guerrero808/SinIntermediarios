import Database from '@ioc:Adonis/Lucid/Database'
import { Group, test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Permissions controller', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()

  })

  test('get permissions', async ({client}) => {
    const user: User =  await User.findOrFail(10);
    const response = await client.get('/permissions').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('post permissions', async ({client}) => {
    const user: User =  await User.findOrFail(10);
    const response = await client.post('/permissions').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('get one permission', async ({client}) => {
    const user: User =  await User.findOrFail(10);
    const response = await client.get('/permissions/2').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('put permissions', async ({client}) => {
    const user: User =  await User.findOrFail(10);
    const response = await client.put('/permissions/2').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('delete permissions', async ({client}) => {
    const user: User =  await User.findOrFail(10);
    const response = await client.delete('/permissions/2').loginAs(user)

    response.assertAgainstApiSpec()
  })
})
