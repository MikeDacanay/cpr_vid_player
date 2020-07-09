$(document).ready(function(){

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function loadPages(i , container) {
    var url = 'pages/page-' + pad(i, 2) + '.html'; 
    i++;
    $.get(url)
        .done(function(data) {
            var $el = $("<section>", {id: pad(i, 2), "class": "page" });
			$el.html(data);
			container.append( $el );
			loadPages(i , container);

        }).fail(function() {
        	return;       
		});
}

loadPages(1 , $(".slick-track"));


});


