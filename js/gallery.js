(function($){
	/*!
	* jQuery Slider Gallery Can Drap
	* Copyright (c) 2013, 梦幻神化
	* Create: 2013.07.12
	* Version: 1.1
	* Update: 1. 支持鼠标滚轮滚动 2. 改成插件形式 3. 兼容IE6+ （2013-12-26）
	*
	* 请保留此信息，如果您有修改或意见可通过网站给我留言
	* http://www.bluesdream.com
	*/
	$(function() {
	/* 默认：拖动滚动 */
	var $startX					= 0,
		$startMargin			= 0,
		$gallery 				= $("#gallery"),										// 容器
		$galleryCon 			= $("#galleryCon"),									// 内容区域(滚动区域)
		$scrollBtn 				= $("#scrollBtn"),									// 拖动按钮
		$scrollBg				= $("#scrollBg"),									// 按钮背景
		$galleryList 			= $galleryCon.children("li"),						// 图片列表
		$galleryList_len			= $galleryList.length,								// 图片数量
		$gallery_width			= $gallery.width(),									// 容器的宽度
		$galleryList_width		= $galleryList.outerWidth(true),					// 单张图片区域的总宽
		$galleryList_count		= $galleryList_width*$galleryList_len,				// 内容宽度(所有图片的宽度总和)
		$scrollbar_wdith		= $("#scrollbar").outerWidth(),						// 滚动条宽度
		$scrollBtn_wdith		= $scrollBtn.outerWidth(true),						// 拖动按钮宽度
		$scroll_width			= $scrollbar_wdith-$scrollBtn_wdith,				// 滚动条拖动范围
		$galleryList_max 		= Math.ceil( $galleryList_len-$gallery_width/$galleryList_width ); // 列表最大数量
		$gallery_index			= $gallery[$gallery.index()];							// 便于后续扩展

	// 初始化
	$galleryCon.css('width',$galleryList_count);

	// 滚动代码
	function scrollTo(distance){
		var pos=-Math.ceil((distance/$scroll_width)*($galleryList_count-$gallery_width)); // 向上取整( ( 按钮拖动距离/滚动条拖动范围 ) * ( 内容宽度/容器的宽度 ) )
		$galleryCon.css('marginLeft',pos);
	}

	$scrollBtn.mousedown(function(e){
		$startX=e.clientX;
		$startMargin=parseInt($scrollBtn.css('marginLeft').replace('px',''));
		$(document).mousemove(function(e){
			var distance=e.clientX-$startX+$startMargin;
			if(distance<0) distance=0;
			if(distance>$scroll_width) distance=$scroll_width;
			$scrollBtn.css('marginLeft',distance);
			$scrollBg.css('width',distance);
			scrollTo(distance);
		});
	});

	$(document).on('mouseup',function() {
		$(this).unbind("mousemove");
	});
	/* 默认结束 */

	/* 扩展1：左右点击滚动 */
	var $step = 0,
		$prevBtn = $("#prevBtn"),
		$nextBtn = $("#nextBtn");

	function prevScroll(){
		if ( !$galleryCon.is(":animated") ) {
			$step = -parseInt($galleryCon.css("marginLeft"))/$galleryList_width;
			if ( $step > 0 ) {
				$step--
				barScrollTo( $galleryList_max,$step );
			}
		}
	}
	function nextScroll(){
		if ( !$galleryCon.is(":animated") ) {
			$step = -parseInt($galleryCon.css("marginLeft"))/$galleryList_width;
			if ( $step < $galleryList_max ) {
				$step++
				barScrollTo( $galleryList_max,$step );
			};
		}
	}

	$prevBtn.click(function(){
		prevScroll();
	});
	$nextBtn.click(function(){
		nextScroll();
	});
	function barScrollTo(over,step){
		var posBtn = Math.ceil( $scroll_width/over*step );
		var posArea = -Math.ceil( ($galleryList_count-$gallery_width)/over*step );
		$scrollBtn.animate({'marginLeft':posBtn});
		$scrollBg.animate({'width':posBtn});
		$galleryCon.animate({'marginLeft':posArea});
	}
	/* 扩展结束 */

	/* 扩展2：鼠标滚轮滚动 */
	function mousewheel(e) {
		var e=e || window.event,
			wheelDelta = e.wheelDelta || e.detail;
		if( wheelDelta == 120 || wheelDelta == -3 ){
			prevScroll();
		}else if( wheelDelta == -120 || wheelDelta == 3 ){
			nextScroll();
		}
	} 
	if( $gallery_index.addEventListener ){ 
		$gallery_index.addEventListener('DOMMouseScroll',mousewheel,false); // Firefox
	}
	$gallery_index.onmousewheel=mousewheel; // IE/Opera/Chrome 
	/* 扩展结束 */

	});
}(jQuery));
