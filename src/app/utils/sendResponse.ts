const sendResponse = (res: any, data: any) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;