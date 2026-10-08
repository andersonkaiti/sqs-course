import { randomUUID } from 'node:crypto'
import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { sqsClient } from '@clients/sqs.client.ts'
import { env } from '@config/env.ts'
import { response } from '@utils/response.ts'

export class PlaceOrderController {
  static async execute() {
    const orderId = randomUUID()

    const command = new SendMessageCommand({
      MessageBody: JSON.stringify({
        orderId,
      }),
      QueueUrl: env.SQS_URL,
    })

    const sqsResponse = await sqsClient.send(command)

    return response({
      statusCode: 200,
      body: {
        messageId: sqsResponse.MessageId,
      },
    })
  }
}
