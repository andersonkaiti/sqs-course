import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoClient } from '@clients/dynamo.client.ts'
import { env } from '@config/env.ts'
import type { SQSEvent } from 'aws-lambda'

export async function handler(event: SQSEvent) {
  const putItems = event.Records.map((record) => {
    const body = JSON.parse(record.body)

    const command = new PutCommand({
      Item: {
        id: body.orderId,
      },
      TableName: env.PAYMENTS_TABLE_NAME,
    })

    return dynamoClient.send(command)
  })

  await Promise.all(putItems)
}
