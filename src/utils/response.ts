import type { IResponse } from '@app-types/http.ts'

export function response({
  statusCode = 200,
  body = {},
  headers = {},
}: IResponse) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...headers },
  }
}
