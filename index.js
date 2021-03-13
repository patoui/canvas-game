window.onload = function () {
    const canvas = document.getElementById('board');
    const context = canvas.getContext('2d');
    const circle = new Circle(canvas);
    let secondsPassed = 0;
    let oldTimeStamp = 0;
    function gameLoop(timeStamp) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        circle.draw(secondsPassed);
        window.requestAnimationFrame(gameLoop);
    };
    gameLoop();
};
