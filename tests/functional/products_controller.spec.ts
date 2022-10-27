import { test } from '@japa/runner'

test.group('Products controller', () => {
  test('get products', async ({assert, client}) => {
    const response = await client.get('/products')

    response.assertAgainstApiSpec()
  })
})
