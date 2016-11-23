function getParamerer(){
	var Paramerer=location.search;
	if(!Paramerer)return false;
		Paramerer=location.search.substr(1).split("&"),obj={};
	for(var i=0;i<Paramerer.length;i++){
		var arr=Paramerer[i].split("=");
		obj[arr[0]]=arr[1]
	}
	return obj

}