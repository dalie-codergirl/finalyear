export class ApiError extends Error {
    constructor(public statusCode: number, message: string, public details?: any) {
      super(message);
      Object.setPrototypeOf(this, ApiError.prototype);
    }
  }
  
  export class BadRequestError extends ApiError {
    constructor(message: string = 'Bad Request', details?: any) {
      super(400, message, details);
    }
  }
  
  export class NotFoundError extends ApiError {
    constructor(message: string = 'Not Found') {
      super(404, message);
    }
  }
  
  export class InternalServerError extends ApiError {
    constructor(message: string = 'Internal Server Error') {
      super(500, message);
    }
  }