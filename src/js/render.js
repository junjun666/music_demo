(function($,root){
    var $scope = $(document.body);
    function renderInfo(info){
        // es6拼接字符串的方法。
        var html = `<h2 class="song-name">${info.song}</h2>
        <h3 class="singer-name">${info.singer}</h3>
        <h3 class="album-name">${info.album}</h3>`;
        $scope.find(".song-info").html(html);
    }
    function renderImg(src){
        console.log(111);
        var img = new Image();
        img.onload = function(){
            $scope.find(".song-img img").attr("src",src);
            root.blurImg(img,$scope);
        }
        img.src = src;
    }
    function renderIsLike(isLike){
        if(isLike){
            $scope.find(".like-btn").addClass("like");
        }else{
            $scope.find(".like-btn").removeClass("like");
        }
    }
    root.render = function(data){
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike);
    }
}(window.Zepto,window.player))