/**
 * 液晶数字字体相关
 * @param id
 * @param options
 * @returns
 */
LiquidCrystalNumber = LiquidCrystalNumber || {};
function LiquidCrystalNumber(id, options){
	// 画布容器div
	var chart_div = document.getElementById(id);
	var style = chart_div.style;
	
	this.options = options || {
		width: 500, // 容器宽度
		height: 300, // 容器高度
		margin: 2 // 画布与容器的间距
	};
	var _width = this.options.width;
	var _height = this.options.height;
	var _margin = this.options.margin;
	
	style.width = _width+'px';
	style.height = _height+'px';
	style.border = '1px red solid';
	
	// 创建画布
	canvas = document.createElement('canvas');
	chart_div.appendChild(canvas);
	canvas.id = 'mycanvas';
	canvas.style.margin = _margin+'px';
	canvas.width = _width-_margin*2;
	canvas.height = _height-_margin*2;
	
	if(!canvas.getContext) {  
		G_vmlCanvasManager.initElement(canvas);  
	}
	
	this.background = options.background || '#666666';// 画布背景色
	var ctx = null;
	if(canvas!=null && canvas.getContext){
		ctx = canvas.getContext('2d');		
		
		ctx.fillStyle = this.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	
	var mycanvas = this;
	this.ctx = ctx;
	this.canvas = canvas;
	this.chart_div = chart_div;
	
	
	// 存放画布中的元素，存放在里面的元素要实现 draw、equals方法和属性CLASS_NAME，需要鼠标事件的要有id属性和isOver方法
	this._drawElements = [];
	
	this._isDraging = false;
	this._currentElement = null;
	this._overElement = null;
	this._selectElement = null;
	var _mousedown = function(e){
		e = e || window.event;
		
	};
	var _mouseup = function(e){
		e = e || window.event;
    	
    };
	var _mousemove = function(e){
		e = e || window.event;
		
    };
    var _click = function(e){
    	e = e || window.event;
    	
    }
    var _dblclick = function(e){
    	e = e || window.event;
    };
    var _mouseover = function(e){
    	e = e || window.event;
    }
    if(this.chart_div.attachEvent){
    	this.chart_div.attachEvent('onmousedown', _mousedown);
    	this.chart_div.attachEvent('onmouseup', _mouseup);
    	this.chart_div.attachEvent('onmousemove', _mousemove);
    	this.chart_div.attachEvent('onclick', _click);
    	this.chart_div.attachEvent('ondblclick', _dblclick);
    	this.chart_div.attachEvent('onmouseover', _mouseover);
	}else{
		this.chart_div.onmousedown = _mousedown;
		this.chart_div.onmouseup = _mouseup;
		this.chart_div.onmousemove = _mousemove;
		this.chart_div.onclick = _click;
		this.chart_div.ondblclick = _dblclick;
		this.chart_div.onmouseover = _mouseover;
	}
    
    /**
     * 阻止右击菜单事件
     */
    this.chart_div.oncontextmenu = function(){
    	return false;
    };
}
LiquidCrystalNumber.prototype.getCanvasXY = function (x, y) {
    var the = this;
    return {
        canvas_x: x,
        canvas_y: y,
        offset: function (x, y) {
            return the.getCanvasXY(this.canvas_x + x, this.canvas_y + y);
        },
        apartTo: function (other) {
            var a = Math.abs(other.canvas_x - this.canvas_x);
            var b = Math.abs(other.canvas_y - this.canvas_y);
            return Math.sqrt(a * a + b * b);
        },
        equals: function (other) {
            return this.canvas_x == other.canvas_x && this.canvas_y == other.canvas_y;
        }
    };
};
LiquidCrystalNumber.prototype.clear = function () {
    this._elements.length = 0;
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};
LiquidCrystalNumber.prototype.getCanvasXYFromMouseEvent = function (e) {
    //console.log(e);
    //console.log(this.chart_div);
    var dom = this.chart_div;
    var top = 0;
    var left = 0;
    while (dom != null) {
        top += dom.offsetTop;
        left += dom.offsetLeft;
        dom = dom.offsetParent;
    }
    var x = e.clientX - left - this.options.margin - 1;
    var y = e.clientY - top - this.options.margin - 1;
    //console.log(x);
    //console.log(y);
    return this.getCanvasXY(x, y);
};
LiquidCrystalNumber.prototype.getPageXYFromCanvasXY = function (pointer) {
    //console.log(e);
    //console.log(this.chart_div);
    var dom = this.chart_div;
    var top = 0;
    var left = 0;
    while (dom != null) {
        top += dom.offsetTop;
        left += dom.offsetLeft;
        dom = dom.offsetParent;
    }
    var x = pointer.canvas_x + left + this.options.margin + 1;
    var y = pointer.canvas_y + top + this.options.margin + 1;
    //console.log(x);
    //console.log(y);
    return {pageX: x, pageY: y};
};

LiquidCrystalNumber.prototype.markerPoint = function (point) {
    this.drawCircle(point, 5);
};
LiquidCrystalNumber.prototype.markerPoints = function (points) {
    for ( var int = 0; int < points.length; int++) {
    	this.drawCircle(points[int], 5);
	}
};

LiquidCrystalNumber.prototype.drawCircle = function (from, radius, options) {
    var the = this;
    var ctx = this.ctx;

    options = options || {};
    var style = typeof options.style == 'undefined' ? "#FFFFFF" : options.style
    var lineWidth = 0;

    ctx.beginPath();
    ctx.arc(from.canvas_x, from.canvas_y, radius, 0, Math.PI * 2, true);
    if (options.fill) {
        ctx.fillStyle = style;
        ctx.fill();
    } else {
        ctx.strokeStyle = style;
        ctx.lineWidth = typeof options.lineWidth == 'undefined' ? 0.6 : options.lineWidth;
        lineWidth = ctx.lineWidth;
        ctx.stroke();
    }
};
/**
 * 起始点 结束点 数字[0-9] 小数点
 */
LiquidCrystalNumber.prototype.drawAllStroke = function(leftP, rightP, val, options){
	var the = this;
	var hasPoint = options.isPoint;
	var showC = options.color || 'red';
	var code = '0000000';
	if(typeof val != 'undefined' && val != null){
		switch (val) {
		case 0:
			code = '1110111';
			break;
		case 1:
			code = '0000011';
			break;
		case 2:
			code = '0111110';
			break;
		case 3:
			code = '0011111';
			break;
		case 4:
			code = '1001011';
			break;
		case 5:
			code = '1011101';
			break;
		case 6:
			code = '1111101';
			break;
		case 7:
			code = '0010011';
			break;
		case 8:
			code = '1111111';
			break;
		case 9:
			code = '1011111';
			break;
		default:
			break;
		}
	}
	
	var _width = rightP.canvas_x - leftP.canvas_x;
	var _height = rightP.canvas_y - leftP.canvas_y;
	
	this.ctx.fillStyle = '#666666';
	this.ctx.fillRect(leftP.canvas_x-0.3, leftP.canvas_y-0.3, _width+1, _height+1);
	
	
	this.ctx.fillStyle = this.background;
	this.ctx.fillRect(leftP.canvas_x, leftP.canvas_y, _width, _height);
	
	var minddleP_L = leftP.offset(0, _height/2);
	var minddleP_R = rightP.offset(0, - _height/2);
	var leftP_B = leftP.offset(0, _height);
	var rightP_T = rightP.offset(0, - _height);
	
	var weight = _height/10;
	// 倾斜度数
	var x = 0;
	var off = 1;
	
	var _21_p1 = leftP.offset(off, 0);
	var _21_p2 = leftP.offset(_width - off, 0);
	var _21_p3 = leftP.offset(_width - off - weight, weight);
	var _21_p4 = leftP.offset(off + weight, weight);
	
	var _11_p1 = leftP.offset(0, off);
	var _11_p2 = leftP.offset(weight, weight + off);
	var _11_p3 = minddleP_L.offset(weight, - weight/2 - off);
	var _11_p4 = minddleP_L.offset(0, - off);
	
	var _31_p1 = rightP_T.offset(- weight, weight + off);
	var _31_p2 = rightP_T.offset(0, off);
	var _31_p3 = minddleP_R.offset(0, - off);
	var _31_p4 = minddleP_R.offset(- weight, - weight/2 - off);
	
	var _12_p1 = minddleP_L.offset(0, off);
	var _12_p2 = minddleP_L.offset(weight, weight/2 + off);
	var _12_p3 = leftP_B.offset(weight, - weight - off);
	var _12_p4 = leftP_B.offset(0, - off);
	
	var _32_p1 = minddleP_R.offset(- weight, weight/2 + off);
	var _32_p2 = minddleP_R.offset(0, off);
	var _32_p3 = rightP.offset(0, - off);
	var _32_p4 = rightP.offset(- weight, - weight - off);
	
	var _23_p1 = leftP_B.offset(off + weight, - weight);
	var _23_p2 = leftP_B.offset(_width - off - weight, - weight);
	var _23_p3 = leftP_B.offset(_width - off, 0);
	var _23_p4 = leftP_B.offset(off, 0);
	
	var _22_p1 = minddleP_L.offset(off, 0);
	var _22_p2 = minddleP_L.offset(off + weight, - weight/2);
	var _22_p3 = minddleP_R.offset(- off - weight, - weight/2);
	var _22_p4 = minddleP_R.offset(- off, 0);
	var _22_p5 = minddleP_R.offset(- off - weight, weight/2);
	var _22_p6 = minddleP_L.offset(off + weight, weight/2);	
	
	var shadwoC = '#555555';
	// 中 1
	//this.markerPoints(zhong1);
	this.fillLoad([ _21_p1, _21_p2, _21_p3, _21_p4 ], code.substring(2, 3) == 0 ? (options.shadow ? shadwoC : null) : showC);	
	// 中2
	this.fillLoad([ _22_p1, _22_p2, _22_p3, _22_p4, _22_p5, _22_p6 ], code.substring(3, 4) == 0 ? (options.shadow ? '#555555' : null) : showC);
	// 中3
	this.fillLoad([ _23_p1, _23_p2, _23_p3, _23_p4 ], code.substring(4, 5) == 0 ? (options.shadow ? shadwoC : null) : showC);
	// 左1
	this.fillLoad([ _11_p1, _11_p2, _11_p3, _11_p4 ], code.substring(0, 1) == 0 ? (options.shadow ? shadwoC : null) : showC);
	// 左2
	this.fillLoad([ _12_p1, _12_p2, _12_p3, _12_p4 ], code.substring(1, 2) == 0 ? (options.shadow ? shadwoC : null) : showC);
	// 右1
	this.fillLoad([ _31_p1, _31_p2, _31_p3, _31_p4 ], code.substring(5, 6) == 0 ? (options.shadow ? shadwoC : null) : showC);
	// 右2
	this.fillLoad([ _32_p1, _32_p2, _32_p3, _32_p4 ], code.substring(6, 7) == 0 ? (options.shadow ? shadwoC : null) : showC);
	
	if(hasPoint != 'noshow'){
		this.drawCircle(rightP.offset(weight/2 + off, -weight/2), weight/2, {
			fill: true,
			style: hasPoint == 'has' ? showC : (options.shadow ? shadwoC : the.background)
		})
	}
	
	
};
LiquidCrystalNumber.prototype.moveTo = function (pointer) {
    this.ctx.moveTo(pointer.canvas_x, pointer.canvas_y);
};
LiquidCrystalNumber.prototype.lineTo = function (pointer) {
    this.ctx.lineTo(pointer.canvas_x, pointer.canvas_y);
};
LiquidCrystalNumber.prototype.fillLoad = function(arr, color){
	if(arr.length < 2){
		return;
	}
	// #555555
	color = color || this.background;
	
	this.ctx.beginPath();	
	this.moveTo(arr[0]);
	for ( var int = 1; int < arr.length; int++) {
		this.lineTo(arr[int]);
	}
    this.lineTo(arr[0]);
    this.ctx.fillStyle = color;
    this.ctx.fill();
};

/**
 * 起始点 数字字符串 宽度 高度 小数点
 */
LiquidCrystalNumber.prototype.drawNumber = function(leftP, num, width, height, options){
	var noPoint = options.noPoint;
	var _width = 23, _height = 40, off = _width*6/23;	
	if(typeof width != 'undefined' && /[1-9]{1}[0-9]*/.test(width) && typeof height != 'undefined' && /[1-9]{1}[0-9]*/.test(height)){
		_width = Number(width);
		_height = Number(height);
	}
	var numt = num + '';
	var isPoint = 'show';
	
	var index = -1;
	for ( var i = 0; i < numt.length; i++) {
		isPoint = noPoint ? 'noshow' : 'show';
		index ++;
		if(i + 1 < numt.length && numt.substring(i+1, i+2) == '.'){
			isPoint = 'has';
		}else if(i + 1 == numt.length){
			isPoint = 'noshow';
		}
		this.drawAllStroke(leftP.offset(index * (_width + off), 0), leftP.offset(index * (_width + off) + _width, _height), Number(numt.substring(i, i+1)), {
			isPoint: isPoint,
			color: options.color,
			shadow: options.shadow
		});
		
		if(i + 1 < numt.length && numt.substring(i+1, i+2) == '.'){
			i ++;
		}
	}
};

// 电子表: 起始点 宽 高
LiquidCrystalNumber.prototype.electronicWatch = function(leftP, width, height){	
	
	var the = this;
	var _width = width*0.7/3;
	var _height = height*0.9;
	
	var hourPointL = leftP.offset(width*0.05, height*0.05);
	var minutePointL = leftP.offset(_width + width*(0.05 + 0.1), height*0.05);
	var secondPointL = leftP.offset(2*_width + width*(0.05 + 0.1*2), height*0.05);
	var hour = -1;
	var minute = -1;
	var second = -1;	
	
	var numOptions = {
		noPoint: true,
		color: '#000000'
	};
	
	var showTimeFun = function(){
		var now = new Date();
		var _hour = now.getHours() < 10 ? '0'+now.getHours() : now.getHours() + '';
		var _minute = now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes() + '';
		var _second = now.getSeconds() < 10 ? '0'+now.getSeconds() : now.getSeconds() + '';
		
		if(_hour != hour){
			// 小时
			hour = _hour;
			the.drawNumber(hourPointL, hour, _width/2, _height, numOptions);
		}
		if(_minute != minute){
			// 分钟
			minute = _minute;
			the.drawNumber(minutePointL, minute, _width/2, _height, numOptions);
		}
		if(_second != second){
			// 秒
			second = _second;
			the.drawNumber(secondPointL, second, _width/2, _height, numOptions);
		}
		
	};
	
	if(this.electronicWatch){
		clearInterval(this.electronicWatch);
	}
	showTimeFun();
	
	var options = {
		fill: true,
		style: numOptions.color
	};
	this.drawCircle(minutePointL.offset(-width*0.028, height*0.3), width*0.01, options);
	this.drawCircle(minutePointL.offset(-width*0.028, height*0.63), width*0.01, options);
	this.drawCircle(secondPointL.offset(-width*0.028, height*0.3), width*0.01, options);
	this.drawCircle(secondPointL.offset(-width*0.028, height*0.63), width*0.01, options);
	
	this.electronicWatch = setInterval(showTimeFun, 1000);
};

LiquidCrystalNumber.prototype.showText = function(leftP, text){
	var pageXY = this.getPageXYFromCanvasXY(leftP);
	var span = document.createElement('span');
	span.style.position = 'absolute';
	span.style.left = pageXY.pageX+'px';
	span.style.top = pageXY.pageY+'px';
	span.style.zIndex = 2;
	span.innerHTML = text;
	span.className = "liquidcrystalnumber-text-span";
	document.body.appendChild(span);
};
LiquidCrystalNumber.showWatch = function(id){
	var mycanvas = new LiquidCrystalNumber(id, {
		width: 280,
		height: 60,
		margin: 2
	});
	var leftP = mycanvas.getCanvasXY(90, 10);
	
	mycanvas.electronicWatch(leftP, 160, 40);
	var now = new Date();
	var day = now.getDay();
	var days = ['一', '二', '三', '四', '五', '六', '日'];
	mycanvas.showText(leftP.offset(-50, 0), '<font color="black">星期'+days[day-1]+'</font>');
	
	var date = now.getFullYear()+'-'+(now.getMonth()+1) +'-'+ now.getDate();
	mycanvas.showText(leftP.offset(-70, 20), '<font color="black">'+date+'</font>');
};
LiquidCrystalNumber.showNumber = function(id, options){
	options = options || {
		shadow: true,
		color: 'black'
	};
	
	if(typeof options.shadow == 'undefined'){
		options.shadow = true;
	}
	if(typeof options.color == 'undefined'){
		options.color = 'black';
	}
	var mycanvas = new LiquidCrystalNumber(id, {
		width: 280,
		height: 60,
		margin: 2
	});
	var leftP = mycanvas.getCanvasXY(6, 13);
	
	mycanvas.drawNumber(leftP, '12345.67890', 20, 30, {
		shadow: options.shadow,
		color: options.color
	});
};
window.onload = function(){
	LiquidCrystalNumber.showWatch('chart-div');
	LiquidCrystalNumber.showNumber('chart-div1', {
		 shadow: true,
		 color: '#DD0000'
	});
};