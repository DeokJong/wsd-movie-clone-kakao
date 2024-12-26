import { TMeResponse } from './models'

import { OpenAPIKakaoToken, CancelablePromise, request } from '@/Core'

export class KakaoApiService {
  public static me(): CancelablePromise<TMeResponse> {
    return request(OpenAPIKakaoToken, {
      url: '/v2/user/me',
      method: 'GET',
    })
  }

  public static logout() {
    return request(OpenAPIKakaoToken, {
      url: '/v1/user/logout',
      method: 'POST',
    })
  }
}
