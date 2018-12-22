function sendResponse(
  response,
  data,
  contentType = "text/plain",
  status = 200
) {
  response.writeHead(status, { "Content-Type": contentType });
  response.end(data);
  // console.log("*********Ответ успешно отправлен****************");
}

module.exports = sendResponse;
