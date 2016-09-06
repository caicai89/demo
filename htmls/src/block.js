require('./block.less');

var board_node = document.createElement("div");
board_node.setAttribute("id","chessboard");

var init_node_index = [6,6];

for (var lindex = 1; lindex < 11; lindex++) {
	var line_node = document.createElement("div");
	line_node.setAttribute("class","line");
	line_node.setAttribute("line-index",lindex);

	for (var cindex = 1; cindex < 11; cindex++) {
		var block_node = document.createElement("div");
		block_node.setAttribute("class","block");
		if(lindex == 1){
			block_node.setAttribute("class","block col-first");
			block_node.setAttribute("col-index",cindex);
		}
		block_node.setAttribute("data-position",lindex+"-"+cindex);

		if(lindex == init_node_index[0] && cindex == init_node_index[1]){
			var chess = document.createElement("div");
			chess.setAttribute("class","chess");
			block_node.appendChild(chess);
		}

		line_node.appendChild(block_node);
	}

	board_node.appendChild(line_node);
}

document.body.appendChild(board_node);


window.onload = function(){
	var btn = document.querySelector("#command-btn");

	function go(ele){
		var curdeg = 0;
		var mathced = ele.style.webkitTransform.match(/rotate\((.+)deg\)/)
		if(mathced){
			curdeg = parseInt(mathced[1]);
			console.log("to left curdeg : "+curdeg);
		}

		if(Math.abs(curdeg) == 0){
			move(ele,-1,0);
		}else if(curdeg == -90 || curdeg == 270){
			move(ele,0,-1);
		}else if(Math.abs(curdeg) == 180){
			move(ele,1,0);
		}else if(curdeg == 90 || curdeg == -270){
			move(ele,0,1);
		}
	}

	function move(ele,line_span,col_span){
		var info = ele.parentNode.getAttribute("data-position").split("-");
		var line_index = parseInt(info[0]);
		var col_index = parseInt(info[1]);
		console.log("line "+line_index + " col_index "+col_index);
		var to_line = line_index + line_span;
		var to_col = col_index + col_span;
		console.log("[data-position='"+to_line+"-"+to_col+"']");
		var dest_block = document.querySelector("[data-position='"+to_line+"-"+to_col+"']");
		if(dest_block){dest_block.appendChild(ele)};
	}

	function my_rotate(ele,deg){
		console.log(ele.style);
		var mathced = ele.style.webkitTransform.match(/rotate\((.+)deg\)/)
		if(mathced){
			var curdeg = parseInt(mathced[mathced.length-1]);
			console.log("to left curdeg : "+curdeg);
			if(curdeg){deg += curdeg;}
		}
		deg = deg % 360;
		console.log(deg);
		
		ele.style.webkitTransform = "rotate("+deg+"deg)";
		ele.style.transform = "rotate("+deg+"deg)";		
	}

	function left(ele){
		var deg = -90;
		my_rotate(ele,deg);
	}

	function right(ele){
		var deg = 90;
		my_rotate(ele,deg);	
	}

	function goback(ele){
		var deg = -180;
		my_rotate(ele,deg);			
	}



	btn.addEventListener("click",function(){
		var input_node = document.querySelector("[name='command']");
		var cmd = input_node.value;
		var chess_node = document.querySelector(".chess");

		if(cmd == "GO"){
			go(chess_node);
		}else if(cmd == "TUN LEF"){
			left(chess_node);
		}else if(cmd == "TUN RIG"){
			right(chess_node);
		}else if(cmd == "TUN BAC"){
			goback(chess_node);
		}

	},false);
}