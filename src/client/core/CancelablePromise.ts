export class CancelError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CancelError'
  }

  public get isCancelled(): boolean {
    return true
  }
}

export interface OnCancel {
  readonly isResolved: boolean
  readonly isRejected: boolean
  readonly isCancelled: boolean

  (cancelHandler: () => void): void
}

export class CancelablePromise<T> implements Promise<T> {
  // 내부 상태 추적 변수들
  private _isResolved: boolean // Promise가 해결되었는지 여부
  private _isRejected: boolean // Promise가 거부되었는지 여부
  private _isCancelled: boolean // Promise가 취소되었는지 여부
  readonly cancelHandlers: (() => void)[] // 취소 핸들러들의 배열
  readonly promise: Promise<T> // 내부 Promise 인스턴스
  private _resolve?: (value: T | PromiseLike<T>) => void // Promise를 해결하는 함수
  private _reject?: (reason?: unknown) => void // Promise를 거부하는 함수

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void, // Promise를 해결하는 함수
      reject: (reason?: unknown) => void, // Promise를 거부하는 함수
      onCancel: OnCancel // 취소 핸들러를 등록하는 함수
    ) => void
  ) {
    // 초기 상태 설정
    this._isResolved = false
    this._isRejected = false
    this._isCancelled = false
    this.cancelHandlers = []

    // 내부 Promise 생성
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject

      // Promise를 해결하는 내부 함수
      const onResolve = (value: T | PromiseLike<T>): void => {
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return
        }
        this._isResolved = true
        if (this._resolve) this._resolve(value)
      }

      // Promise를 거부하는 내부 함수
      const onReject = (reason?: unknown): void => {
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return
        }
        this._isRejected = true
        if (this._reject) this._reject(reason)
      }

      // 취소 핸들러를 등록하는 내부 함수
      const onCancel = (cancelHandler: () => void): void => {
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return
        }
        this.cancelHandlers.push(cancelHandler)
      }

      // onCancel 속성에 접근할 수 있는 게터 정의
      Object.defineProperty(onCancel, 'isResolved', {
        get: (): boolean => this._isResolved,
      })

      Object.defineProperty(onCancel, 'isRejected', {
        get: (): boolean => this._isRejected,
      })

      Object.defineProperty(onCancel, 'isCancelled', {
        get: (): boolean => this._isCancelled,
      })

      return executor(onResolve, onReject, onCancel as OnCancel)
    })
  }

  // Promise의 toStringTag를 'Cancellable Promise'로 설정
  get [Symbol.toStringTag]() {
    return 'Cancellable Promise'
  }

  public then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onFulfilled, onRejected)
  }

  public catch<TResult = never>(
    onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null
  ): Promise<T | TResult> {
    return this.promise.catch(onRejected)
  }

  public finally(onFinally?: (() => void) | null): Promise<T> {
    return this.promise.finally(onFinally)
  }

  public cancel(): void {
    if (this._isResolved || this._isRejected || this._isCancelled) {
      return
    }
    this._isCancelled = true
    if (this.cancelHandlers.length) {
      try {
        for (const cancelHandler of this.cancelHandlers) {
          cancelHandler()
        }
      } catch (error) {
        console.warn('Cancellation threw an error', error)
        return
      }
    }
    this.cancelHandlers.length = 0
    if (this._reject) this._reject(new CancelError('Request aborted'))
  }

  public get isCancelled(): boolean {
    return this._isCancelled
  }
}
