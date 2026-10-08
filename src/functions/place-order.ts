import { PlaceOrderController } from '@controllers/place-order.controller.ts'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'

export async function handler(_event: APIGatewayProxyEventV2) {
  return await PlaceOrderController.execute()
}
