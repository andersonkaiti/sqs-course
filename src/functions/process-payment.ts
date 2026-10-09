import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoClient } from '@clients/dynamo.client.ts'
import { env } from '@config/env.ts'
import type { SQSEvent } from 'aws-lambda'

export async function handler(event: SQSEvent) {
  const putItems = event.Records.map(async (record, index) => {
    // mocking a dynamo error
    if (index === 0) {
      throw new Error('Dynamo error.')
    }

    const body = JSON.parse(record.body)

    const command = new PutCommand({
      Item: {
        id: body.orderId,
      },
      TableName: env.PAYMENTS_TABLE_NAME,
    })

    return dynamoClient.send(command)
  })

  const responses = await Promise.allSettled(putItems)

  const batchItemFailures = responses
    .map(
      (response, index) =>
        response.status === 'rejected' && {
          itemIdentifier: event.Records[index].messageId,
        },
    )
    .filter(Boolean)

  return {
    batchItemFailures,
  }
}
