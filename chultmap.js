function init(){
	var list = document.getElementById("hexlist");
	
	for(var i = 0; i < 6120; i++){
		
		var node = document.createElement("LI"); 
		node.className = "hex-grid__item";	
		
		
		var divnode = document.createElement("DIV");
		divnode.className = "hex-grid__content";
		var iterator = i;
		divnode.addEventListener('click', 
			function(e) {
				console.log(e.target);
				e.target.style.visibility = "hidden";
			}
		);
		
		node.appendChild(divnode);
		list.appendChild(node);
	}
	
	resetToToAStartState();
	
	document.getElementById('upload').addEventListener('change', readFileAsString)
}

function getVisibleCells(){
	var list = document.getElementById("hexlist");
	var liElements = list.childNodes;
	var visibleCells = [];
	
	var sectionStart = null;
	var sectionEnd = null;
	var visibleCellsString = "";
	
	for(var i = 0; i < liElements.length; i++) {
		if(liElements[i].nodeName == "LI" && liElements[i].firstElementChild.style.visibility == "hidden") {
			if(sectionStart === null) {
				sectionStart = i;
			} else {
				sectionEnd = i;
			}
			
			if(i == liElements.length-1){
				if(sectionStart == sectionEnd || sectionEnd === null) {
					visibleCellsString += sectionStart;
				} else {
					visibleCellsString += (sectionStart + "-" + sectionEnd);
				}
			}
		} else if(sectionStart != null) {
			if(sectionStart == sectionEnd || sectionEnd === null) {
				//visibleCells.push(sectionStart);
				visibleCellsString += sectionStart;
			} else {
				//visibleCells.push(sectionStart + "-" + sectionEnd);
				visibleCellsString += (sectionStart + "-" + sectionEnd);
			}
			
			sectionStart = null;
			sectionEnd = null;
			if(i < liElements.length - 1){
				visibleCellsString += ",";
			}
		}
		
	}
	
	console.log(visibleCellsString);
	
	var mapfile = new Blob([visibleCellsString], {type: 'text/plain'});
	
	var downloadLink = document.createElement('a');
	downloadLink.download = 'chultMapSavefile.txt';
	downloadLink.href = window.URL.createObjectURL(mapfile);
	downloadLink.click();
}


function makeCellsVisible(cellString){
	var ids = cellString.split(",");
	console.log(ids);
	var list = document.getElementById("hexlist");
	var liElements = list.childNodes;
	
	
	for(var i = 0; i < ids.length; i++) {
		if(ids[i].includes("-")){
			var points = ids[i].split("-");
			for(var j = points[0]; j <= points[1]; j++){
				liElements[j].firstElementChild.style.visibility = "hidden";
			}
		} else {
			liElements[ids[i]].firstElementChild.style.visibility = "hidden";
		}
	}
}

function readFileAsString() {
    var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
        console.log('File content:', event.target.result);
		makeCellsVisible(event.target.result)
		
    };
    reader.readAsText(files[0]);
}

function resetToToAStartState(){
	var startState="1-1618,1620-1689,1693-1758,1762,1765-1828,1837-1898,1907-1968,1977-2039,2047-2058,2061-2108,2110,2119-2124,2128-2130,2133-2181,2189-2194,2200-2201,2205-2250,2252,2261-2264,2272-2273,2277-2322,2344-2345,2349-2351,2354-2394,2421-2423,2427-2467,2493-2495,2499-2540,2563-2566,2570-2610,2635-2637,2642-2683,2687-2688,2707-2709,2715-2761,2780-2781,2786-2833,2858-2904,2930-2975,3002-3046,3074-3116,3146-3186,3219-3222,3226-3257,3292,3300-3329,3365,3373-3401,3436-3437,3446-3475,3479-3480,3508-3509,3519-3552,3579-3581,3583-3584,3588-3589,3592-3622,3637-3638,3650-3657,3659-3695,3697,3704-3705,3707-3710,3713-3715,3722,3724-3771,3776-3786,3798-3801,3804-3810,3812-3842,3848-3861,3872-3873,3878-3879,3885-3914,3920-3934,3944-3945,3957-3982,3984,3994-4000,4029-4054,4070-4071,4101-4127,4135,4142-4143,4169,4173-4199,4205-4209,4211,4217,4223,4235,4237,4239-4242,4245-4271,4273-4285,4287-4289,4292-4296,4308-4312,4315-4361,4363-4369,4371,4373-4375,4381-4384,4387-4447,4453-4457,4459-4519,4526-4591,4597-4664,4669-4737,4739-6120";
	
	makeCellsVisible(startState);
}


