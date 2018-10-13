function stringCircular(target) {
	let arr=[];
	let newObj = Object.assign({},target)
	removeCircular(newObj)

	function removeCircular(obj){
	//проходим циклом по всем ключам
	  for (key in obj){
	    let testObj = obj[key]
	    //каждый ключ пробуем сериализовать
	    try{
	      JSON.stringify(testObj)
	    //если не получается, добавляем этот ключ (а по сути объект) в массив
	    }catch(err){
	      arr.push(testObj);
	     //проверяем ключ, на идентичность (объекты для сравнения лежат в массиве)
	      let d = checkInstanse(testObj);
	    // если идентичных объектов найдено не было - ищем идентичности внутри этого ключа(объекта)
	      if(!d){ 
	        removeCircular(testObj)
	      } else{
	      	delete obj[key]
	      	obj[key] = "CIRCULAR"
	      }
	    } 
	  }
	}

	function checkInstanse(obj){
	  let returnObj;
	  for (let i=0; i<arr.length; i++){
			if (Object.is(arr[i], obj)){
			  returnObj = obj;
			}
			  }
	  return returnObj
	}

	return JSON.stringify(newObj)
}

let man = {
	name: 'Ivan',
	age: 19,
}
man.friend = man


console.log(stringCircular(man))