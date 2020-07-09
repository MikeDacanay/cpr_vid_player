var myScroll;
var brightcove;
var firstLandscape = false;
var _index = 0;
var ln = 31;
var _isTouch = false;
if (!window.console) console = {
    log: function () {}
};
var o_interval;
var to_interval;

var isIOS;

checkOrientation = function () {
    if (_isTouch) {
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        setTimeout(resetVP, 200);
    }
}

function getTouch() {
    if (_isTouch) return "click";
    return "click";
}

// Youtube videos go here
function setUpOverlayLinks() {
    $("#leftTitle").bind(getTouch(), {
        link: "http://www.oracle.com"
    }, launchLink);

}

function launchLink(ob) {
    var open = window.open(ob.data.id, '_blank');
    if (!open) alert('Could not open the image browser, please disable your popup blocker.');
}

function openYouTubeOverlay() {
    var cwidth = 738;
    var cheight = 414;
    $(".youtube-overlay-container").css({
        'display': 'block',
        'width': cwidth + 'px',
        'height': (cheight + 0) + 'px',
        'overflow': 'visible'
    });

    if (navigator.userAgent.indexOf("iPad") >= 0) {
        $("#youtube-overlay-container").css({
            'display': 'block',
            'width': cwidth + 'px',
            'height': '379px',
            'overflow': 'visible'
        });
    }

    $("#youtube-overlay-content").css({
        'display': 'block',
        'width': cwidth + 'px',
        'height': cheight + 'px'
    });
    //$("#youtube-overlay-content").html($(ob.data.id).html());
    $("#youtube-overlay-content").css('overflow', 'hidden');

    $("#youtube-overlay-container").bPopup({
        follow: [true, true],
        position: ['auto', 'auto'],
        escClose: 'true'
    });


    $("#youtube-overlay-content").css('opacity', 1);
}

function openVideoOverlay(ob) {
    var videoID=ob;

  //  ob.data ? videoID = ob.data.video : videoID = $(ob.currentTarget).attr("vid");
    var cwidth = 639;
    var cheight = 414;

    if(window.innerWidth<500){
       cwidth=300;
       cheight=168;

    }
    $("#voverlay-container").css({
        'display': 'block',
        'width': cwidth + 'px',
        'height': 'auto'
    });
    $("#voverlay-content").css({
        'display': 'block',
        'width': cwidth + 'px',
        'height': 'auto'
    });
//2018 player
    $("#voverlay-content").html(
            '<video data-account="1460825906" data-player="SyGHte2Ul" data-embed="default" data-video-id="' + videoID + '" class="video-js" controls style="width:100%;height: 100%;position:relative;top: 0px; bottom: 0px; right: 0px; left: 0px;"></video>'+
            '<script src="//players.brightcove.net/1460825906/SyGHte2Ul_default/index.min.js"></script>'
    );


    $("#voverlay-container").bPopup({
        follow: [true, true],
        position: ['auto', 'auto'],
        appendTo:'html'
    });
}

function openOverlay(pop){
    var popID=pop;
    var cwidth=pop.width;
    var cheight=pop.height;
    $("#popupContainer").css({'display':'block','width':cwidth+'px','height':cheight+'px'});
    $(popID).bPopup({
        follow: [true, true],
        position: ['auto', 'auto'],
        transition: 'zoomIn',
        content:'image',
        modalclose:'true',
        appendTo:'html',

    },
        function(){alert('CALLBACK') })
}

function is_touch_device() {
    var el = document.createElement('div');
    el.setAttribute('ongesturestart', 'return;');
    if (typeof el.ongesturestart == "function") {

        if(window.innerWidth < 760  ){
            isIOS = true;
        }
        return true;
    } else {
        return false;
    }
}


checkOrientation();
setUpOverlayLinks();
