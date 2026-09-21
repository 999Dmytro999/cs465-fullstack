const createResponse = () => {
  const response = {
    body: undefined,
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };

  return response;
};

module.exports = {
  createResponse
};
