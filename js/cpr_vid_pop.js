(function ($){
	const objVids = {};

	$.fn.openVidOverlay = function(options){	
		const self = this;

		$('.modalVid').hasClass('modalVid') ? 
			null :
			addModalVid();					
		pushVidsToGroup(self, options);

		const thizOpts = objVids[self.selector];
		clickEventHandler(thizOpts);

		function clickEventHandler(opt){			
			$(self).click(function(){			

				$('iframe').remove();

				$('.lightboxVid').prepend(vidplayerSelect(opt));
				$('.modalVid').addClass('modalVid__active');
				$('.lightboxVid').addClass('lightboxVid__active');		
			});
		
			$('.modalVid').click(function(){
				stopVideos();
				$('.lightboxVid').removeClass('lightboxVid__active');	
				$('.modalVid').removeClass('modalVid__active');					
			});
		}

		function stopVideos(){
				$('iframe').attr('src', $('iframe').attr("src"));
    };		

		function vidplayerSelect(optionz){
			console.log(optionz);
// <iframe width="738" height="414" src="https://www.youtube.com/embed/DtHnZNE4gVY" frameborder="0"
//                     allowfullscreen></iframe>
			if(optionz.player[0] === 'y'){
				return `<iframe id='videoY' src='https://www.youtube.com/embed/${optionz.id}' frameborder="0" allowfullscreen></iframe>`;
			}else{

				return				
			}
		}

		function addModalVid(){
			const modalVid = "<div class='modalVid'><div class='modalClose'></div><div class='lightboxVid'><div class='lightboxVid__height'></div></div></div>";
			$('footer').after(`${modalVid}`);
		}

		function pushVidsToGroup(selv, optsz){			
			objVids[selv.selector] = optsz;

			console.log(objVids);
		}
	}
})(jQuery);

	