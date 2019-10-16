(function resize() {
    var canvas = document.getElementById('canvasOne');
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    }
    resizeCanvas();
})();

window.onresize = function(){location.reload();}