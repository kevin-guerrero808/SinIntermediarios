import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Farmers controller', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()

  })

  test('get farmers', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.get('/farmers').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('post farmer', async ({client}) => {
    const user: User =  await User.findOrFail(9);
    const response = await client.post('/farmers').loginAs(user)

    response.assertAgainstApiSpec()
  })
  // test('get one farmer', async ({client}) => {
  //   const user: User =  await User.findOrFail(23);
  //   const response = await client.get('/farmer/3').loginAs(user)

  //   response.assertAgainstApiSpec()
  // })
})
