var sourceLoader={
	sources:{},
	sourceNum:0,
	loadedNum:0,
	//принимает:1) тип контента(js,img)
	//			2)scr  - путь к контенту;
	// необязательный параметр id;
	load:function(type,src,id){
		sourceLoader.sourceNum += 1;
		var loaded = function(event){
			sourceLoader.loadedNum += 1;
			//определяет % загруженных файлов и выводит это на экран
			var persent = Math.round((100/sourceLoader.sourceNum)*sourceLoader.loadedNum);
        	var loadedBlock = document.getElementById("loadedBlock");
        	loadedBlock.style.width = persent+"%";
		} 
		if (type=='img'){
            var img = new Image();
            img.onload = loaded;
            sourceLoader.sources[id]=img;
            img.src=src;
        }
        else if (type == "js"){
        	var script=document.createElement('script');
        	var head = document.querySelector("head");
        	script.src=src;
        	head.appendChild(script);
        	script.onload = loaded;
        }
	},
	allOnLoad:function(callback){
		var thisCallback = callback || function(){};
        if (sourceLoader.loadedNum==sourceLoader.sourceNum) {
            thisCallback();
        }
        else {
            setTimeout(function(){
                sourceLoader.allOnLoad(thisCallback);
            },20);
        }
    }
}

