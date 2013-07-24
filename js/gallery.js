(function($){
	$(function() {
	/* 默认：拖动滚动 */
	var $startX					= 0,
		$startMargin			= 0,
		$focus 					= false,													// 是否获取焦点(是否点击拖动按钮)
		$gallery 				= $("#gallery"),										// 容器
		$galleryCon 			= $("#galleryCon"),									// 内容区域(滚动区域)
		$scrollBtn 				= $("#scrollBtn"),										// 拖动按钮
		$scrollBg				= $("#scrollBg"),										// 按钮背景
		$galleryList 			= $gallery.find("li"),									// 图片列表
		$galleryList_len			= $galleryList.length,									// 图片数量
		$gallery_width			= $gallery.width(),										// 容器的宽度
		$galleryList_width		= $galleryList.outerWidth(true),						// 单张图片区域的总宽
		$galleryList_count		= $galleryList_width*$galleryList_len,					// 内容宽度(所有图片的宽度总和)
		$scrollbar_wdith		= $("#scrollbar").outerWidth(),						// 滚动条宽度
		$scrollBtn_wdith		= $scrollBtn.outerWidth(true),							// 拖动按钮宽度
		$scroll_width			= $scrollbar_wdith-$scrollBtn_wdith;					// 滚动条拖动范围

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
		$focus = true;
	});

	$(document).mousemove(function(e){
		if($focus){
			var distance=e.clientX-$startX+$startMargin;
			if(distance<0) distance=0;
			if(distance>$scroll_width) distance=$scroll_width;
			$scrollBtn.css('marginLeft',distance);
			$scrollBg.css('width',distance);
			scrollTo(distance);
		}
	});

	$(document).mouseup(function(){
		$focus=false;
	});
	/* 默认结束 */

	/* 扩展：左右点击滚动 */
	var $step = 0,
		$prevBtn = $("#prevBtn"),
		$nextBtn = $("#nextBtn");

	$prevBtn.click(function(){
		var $over = Math.ceil( $galleryList_len-$gallery_width/$galleryList_width );
		$step = -parseInt($galleryCon.css("marginLeft"))/$galleryList_width
		if ( $step > 0 ) {
			$step--
			barScrollTo( $over,$step );
		}
		return false;
	});
	$nextBtn.click(function(){
		var $over = Math.ceil( $galleryList_len-$gallery_width/$galleryList_width );
		$step = -parseInt($galleryCon.css("marginLeft"))/$galleryList_width
		if ( $step < $over ) {
			$step++
			barScrollTo( $over,$step );
		};
		return false;
	});
	function barScrollTo(over,step){
		var posBtn = Math.ceil( $scroll_width/over*step );
		var posArea = -Math.ceil( ($galleryList_count-$gallery_width)/over*step );
		$scrollBtn.animate({'marginLeft':posBtn});
		$scrollBg.animate({'width':posBtn});
		$galleryCon.animate({'marginLeft':posArea});
	}
	/* 扩展结束 */

	});
}(jQuery));