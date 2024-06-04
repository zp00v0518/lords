function sendResponse(
  response,
  data,
  contentType = "text/plain",
  status = 200
) {
  if (!response._closed) {
    response.writeHead(status, { "Content-Type": contentType });
    response.end(data);
  } else {
    console.log(contentType)
  }

}

module.exports = sendResponse;
