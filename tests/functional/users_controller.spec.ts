import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Users controller', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()

  })

  test('get users', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.get('/users').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('post users', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.post('/users').loginAs(user).form({
      name: 'Aleja',
      email: 'alejitasalazar@gmail.com',
      password: "12345"
    })

    response.assertAgainstApiSpec()
  })
  test('get one user', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.get('/users/3').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('put user', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.put('/users/3').loginAs(user)

    response.assertAgainstApiSpec()
  })
  test('delete user', async ({client}) => {
    const user: User =  await User.findOrFail(23);
    const response = await client.delete('/users/3').loginAs(user)

    response.assertAgainstApiSpec()
  })
})
