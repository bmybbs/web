var pause=false;

function showloginpics(pics){
    var list=pics.split(";;");

    for(i=0;i<list.length;++i){
        // insert pics
		var pic=list[i].split(";");
		$('<a href="http://bbs.xjtu.edu.cn/'+ pic[1] +'" target="_blank"><img id="pic' + i + '" src="' + pic[0] + '"/></a>').appendTo('div#img-container');
        /*if(list.length>1){
            //insert nav-buttons
            // $('<a id="nav-button-'+i+'">'+i+'</a>').appendTo('div#img-nav');
            //nav-button click
            $('a#nav-button-'+i).click(function(){
                var picindex = $(this).text();
                $('#img-nav a.nav-active').removeClass('nav-active');
                $('a#nav-button-'+picindex).addClass('nav-active');

                var targetPic=$('img#pic'+picindex).parent();
                var currentPic=$('#img-container a.show');

                targetPic.css({opacity: 0.0}).addClass('show').animate({opacity:1.0}, 1200);
                currentPic.animate({opacity: 0.0}, 1200).removeClass('show');
            });
        }*/
	}

	if(list.length>1){
        $('#img-nav').width(17*list.length+5);
        $('#img-nav').css("margin-left",(780-17*list.length-5)/2);

        $('img#pic0').parent().addClass('show');
        //$('a#nav-button-0').addClass('nav-active');

        $('#img-container a').css({opacity: 0.0});

        $('#img-container a.show').css({opacity: 1.0});

        // 设置暂停
        $('#img-container a').mouseover(function(){
            pause=true;
        });
        $('#img-container a').mouseout(function(){
            pause=false;
        });
        /*$('#img-nav a').mouseover(function(){
            pause=true;
        });
        $('#img-nav a').mouseout(function(){
            pause=false;
        });*/

        setInterval('gallery()', 6000);
    }
}

function gallery() {
    if(pause==false){
        var current = ($('#img-container a.show')? $('#img-container a.show') : $('#img-container a:first'));

        var next = ((current.next().length)? current.next() : $('#img-container a:first'));

        //var currentButton = ($('#img-nav a.nav-active')? $('#img-nav a.nav-active') : $('#img-nav a:first'));

        //var nextButton = ((currentButton.next().length)? currentButton.next() : $('#img-nav a:first'));

        next.css({opacity: 0.0}).addClass('show').animate({opacity:1.0}, 1200);

        //nextButton.addClass('nav-active');
        //currentButton.removeClass('nav-active');

        current.animate({opacity: 0.0}, 1200).removeClass('show');
    }
}
