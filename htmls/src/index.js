 require("./style.less");

 var node = document.createElement('h1');
 node.innerText = "Hello Word!";
 document.body.appendChild(node);

 var navNode = document.createElement('ol');
 navNode.classList.add("nav");

 for (var i = 1; i < 6; i++) {
 	var nav = document.createElement("li");
 	nav.classList.add("nitem");	
 	if(i==3){
 		nav.classList.add("new");
 	}
 	if(i==5){
 		nav.classList.add("newmsg");
 		nav.setAttribute("msgcount",2);
 	}
 	nav.innerText = "NAV "+ i;
 	navNode.appendChild(nav);
 }

 document.body.appendChild(navNode);


 var listNode = document.createElement('ol');
 listNode.classList.add("list");

 for (var i = 1; i < 6; i++) {
 	var liNode = document.createElement("li");
 	liNode.classList.add("item");
 	liNode.setAttribute("index",i);
 	liNode.innerText = "This is the " + i + " item";
 	listNode.appendChild(liNode);
 }

 document.body.appendChild(listNode);

