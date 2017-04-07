/**
 * 进度条插件。
 * 要求的html结构。
 * <div id="progressBar" class="ui-slider ui-slider-horizontal" draggable="false">
 *  	<div class="ui-slider-handle" draggable="false"></div>
 *  	<div class="ui-slider-range ui-corner-all" draggable="false"></div>
 * </div>
 */
export default {
	init(selector, opt) {
		let after = opt.after || function() {}
		// 522px
		//滚动条总长度
		let totleWidth = parseInt(window.getComputedStyle(document.querySelector(selector)).width)
		//控制按钮的margin-left
		let handlerMarginLeft = parseInt(window.getComputedStyle(document.querySelector(selector + " .ui-slider-handle")).marginLeft)
		//控制按钮的width
		let handlerWidth = parseInt(window.getComputedStyle(document.querySelector(selector + " .ui-slider-handle")).width)

		//百分比
		let percent = -1;
		//鼠标按下screenX
		let startX = 0;
		//鼠标按下时控制点的screenX
		let startLeft = 0;
		//拖动时上锁
		let isLocked = false;

		document.querySelector(selector + " .ui-slider-handle").addEventListener('mousedown', function(e) {
			let left = startLeft = parseInt(window.getComputedStyle(e.target).left)

			//percent = parseInt((left + handlerMarginLeft + handlerWidth/2) / totleWidth * 100 + 1);

			startX = e.screenX;

			// console.log(percent, left, handlerWidth, totleWidth, handlerMarginLeft)
			isLocked = true;
		}, false)

		document.addEventListener('mousemove', function(e) {

			if(isLocked) {
				//控制按钮新位置，只计算当前鼠标和起始鼠标位置的偏移量
				let np =  (e.screenX - startX + startLeft)
				//限制控制按钮不能超出进度条范围。
				if(np < 0) {
					np = 0
				} else if (np > totleWidth) {
					np = totleWidth
				}
				document.querySelector(selector + " .ui-slider-handle").style.left = np + 'px';
				document.querySelector(selector + " .ui-slider-range").style.width = np + 'px';
			}
		}, false)

		document.addEventListener('mouseup', function(e) {
			let tar = document.querySelector(selector + " .ui-slider-handle")
			let left = parseInt(window.getComputedStyle(tar).left)

			percent = parseInt((left + handlerMarginLeft + handlerWidth/2) / totleWidth * 100 + 1)
			//如果，松开鼠标时再控制按钮上，则返回进度值，防止鼠标在其他地方点击时也会返回进度值。
			if(isLocked) {
				opt.after(percent);
			}
			// console.log(percent, left, handlerMarginLeft, handlerWidth, totleWidth, (left + handlerMarginLeft + handlerWidth/2) / totleWidth * 100)
			

			isLocked = false;
		}, false)

		//设置进度条进度
		function value(value) {
			if(isLocked) return;

			let np = parseInt((value * totleWidth / 100) - handlerMarginLeft)
			
			document.querySelector(selector + " .ui-slider-handle").style.left = np + 'px';
			document.querySelector(selector + " .ui-slider-range").style.width = np + 'px';

		}
		
		return {
			value: value,
			totleWidth: totleWidth,
			percent: percent,
			isLocked: isLocked
		}
	},

}