const responseHandlerMiddleware = (status, req, res, next) => {
    if (status !== 200) {
      const data = res.exception || res.error;
      res.status(status).send({
        status: 'error',
        message: data
      });
    } else if (status === 200) {
      const result = res.data;
      res.status(200).send({
        status: 'success',
        data: result
      });
    } else {
      res.status(500).send({
        status: 'error'
      })
    }
};
  
module.exports = responseHandlerMiddleware