import type { CancelablePromise } from './core/CancelablePromise'
import { OpenAPI } from './core/OpenAPI'
import { request as __request } from './core/request'
import type {
  Message,
} from './models'

export class TestService {
  public static test(): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: 'GET',
      url: 'https://www.google.com/',
    })
  }
}
