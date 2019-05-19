var root = window.player;
var render = root.render;
var $scope = $(document.body);
var $ = window.Zepto;
var songList;
var controlmanager;
var audiomanager = new root.audioManager;
var proccessor = root.proccessor;
var playList = root.playList;
var index = 0;
function bindTouch(){
    var $slidePoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on("touchstart",function(){
        proccessor.stopPro()
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left)/width;
        if(percent <  0||percent > 1){
            percent = 0;
        }
        proccessor.update(percent);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left)/width;
        proccessor.startPro(percent);
        var time = percent * songList[controlmanager.index].duration;
        audiomanager.jumpToPlay(time);
        $scope.find(".play-btn").addClass("playing");
    })
}
function bindClick(){
    $scope.on("play:change",function(event,index,flag){
        var song = songList[index];
        render(song);
        audiomanager.setAudioSource(song.audio);
        if(audiomanager.status == "play" || flag){
            audiomanager.play();
            proccessor.startPro();
        }
        proccessor.renderAllTime(song.duration);
        proccessor.update(0);
    })
    $scope.find(".prev-btn").on("click",function(){
        var index = controlmanager.prev();
        $scope.trigger("play:change",[index]);
    })
    $scope.find(".next-btn").on("click",function(){
        var index = controlmanager.next();
        $scope.trigger("play:change",[index]);
    })
    $scope.on("click",".list-btn",function(){
        playList.show(controlmanager);
    })
    $scope.on("click",".play-btn",function(){
        if(audiomanager.status == "pause"){
            audiomanager.play();
            proccessor.startPro();
            // $scope.find(".play-btn").addClass("playing");
        }else{
            audiomanager.pause();
            proccessor.stopPro();
            // $scope.find(".play-btn").removeClass("playing");
        }
        $scope.find(".play-btn").toggleClass("playing");
    })
}
function successFn(data){
    songList = data;
    bindClick();
    bindTouch();
    $scope.trigger("play:change",[0]);
    controlmanager = new root.controlManager(data.length);
    playList.renderList(data);
}
function getData(url){
    $.ajax({
        type: "GET",
        url: url,
        success: successFn
    })
}
getData("/mock/data.json");