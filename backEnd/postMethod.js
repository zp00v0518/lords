const url = require("url");  
const {reqOn, sendResponse, getVariable} = require("./tube.js");
const Cookies = require("cookies");
const template = require('template_func');
const log = new template.Log(__filename);

function postMethod(req, res, startPath){
	// console.log("********** PostMethod Work ************");
	let urlParse = url.parse(req.url);
	let pathName = urlParse.path;
	let cookies = new Cookies(req, res);
	let userCookies = cookies.get("user");
	log.log(pathName)
	reqOn(req).then((data) => {
		let requestData = template.tryJsonParse(data);
		if (requestData) {
			switch (pathName) {
				case '/login':
					sendResponse(res, data);
					break;
				case '/dev':
					const target = getVariable(JSON.parse(data));
					if (target) {
						const	result = template.stringCircular(target)
						sendResponse(res, result);
					} else {
						sendResponse(res, "По такому ключу ничего не найдено");
					}
					break;
			}
		} else {
			log.log("Информацию полученную от клиента распарсить не удалось")
			requestData = {
				status:"err", 
				message:"Информацию полученную от клиента распарсить не удалось",
				data: data,
			}
			sendResponse(res, JSON.stringify(requestData));
		}
	})

	// reqOn(req, (data)=>{
	// 	console.log("pathName:  "+pathName);
		
	// 	let requestData = getParseData(data);
	// 	if (!requestData){
	// 		requestData = {status:"err", message:"Информацию полученную от клиента распарсить не удалось"};
	// 		sendResponse(res, JSON.stringify(requestData));
	// 		return;
	// 	}



	// 	if (pathName == "/login"){ 
	// 		login(req, res, requestData);
	// 		return;
	// 	};

	// 	const userServer = getUserServer(userCookies);
	// 	// console.log(userServer)
	// 	if(userServer.status == "err"){
	// 		sendResponse(res, JSON.stringify(userServer));
	// 		return;
	// 	}

	// 	let user = {};
	// 	Object.assign(user,UserOnline[userServer][userCookies]);
	// 	delete user.ws; //удаляю поле, т.к. оно не дает возможности сереализации;
	// 	user.userServer = userServer;

	// 	if (!user){
	// 		let errRequest = {
	// 			status:"err",
	// 		}
	// 		let stringRes = JSON.stringify(errRequest);
	// 		sendResponse(res, stringRes);
	// 		return;
	// 	};
	// });
}

module.exports = postMethod;