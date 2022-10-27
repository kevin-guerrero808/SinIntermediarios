import Database from '@ioc:Adonis/Lucid/Database'
import { Group, test } from '@japa/runner'

test.group('Permissions controller', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()

    return () => Database.rollbackGlobalTransaction()

  })

  test('get permissions', async ({client}) => {
    const response = await client.get('/permissions')

    response.assertAgainstApiSpec()
  })
  test('post permissions', async ({client}) => {
    const response = await client.post('/permissions')

    response.assertAgainstApiSpec()
  })
  test('get one permission', async ({client, route}) => {
    const response = await client.get('/permissions/1')

    response.assertAgainstApiSpec()
  })
  test('put permissions', async ({client, route}) => {
    const response = await client.put('/permissions/1')

    response.assertAgainstApiSpec()
  })
  test('delete permissions', async ({client, route}) => {
    const response = await client.delete('/permissions/1')

    response.assertAgainstApiSpec()
  })
})
