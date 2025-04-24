import CustomError from "./custom-error";

class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}

export default ForbiddenError;
