const StatusCode = {
  CREATED: 201,
  SUCCESS: 200,
  DELETED: 204,
};

const MESSAGE = {
  CREATED: "Created successfully!",
  DELETED: "Deleted successfully!",
  SUCCESS: "OK! Successfully!",
};

class SuccessResponse {
  constructor(message = MESSAGE.SUCCESS, statusCode = StatusCode.SUCCESS) {
    this.message = message;
    this.statusCode = statusCode;
  }

  send(res) {
    return res.status(this.statusCode).json(this);
  }
}

class Created extends SuccessResponse {
  constructor(message = MESSAGE.CREATED, data = {}, option = {}) {
    super(message, StatusCode.CREATED, data, option);
    this.data = data;
    this.option = option;
  }
}

class Success extends SuccessResponse {
  constructor(message = MESSAGE.SUCCESS, data = {}) {
    super(message, StatusCode.SUCCESS);
    this.data = data;
  }

  send(res) {
    return res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = {
  Created,
  Success,
  SuccessResponse,
};
