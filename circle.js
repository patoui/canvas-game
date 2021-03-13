class Circle extends Character
{
    constructor (canvas, x = 0, y = 0)
    {
        super(canvas, x, y,  'circle-simple.png', 5, 1);
        this.walk('no');
        const circleInstance = this;

        window.onkeydown = function(e) {
            switch(parseInt(e.which || e.keyCode)) {
                case 38: // up arrow
                circleInstance.walk('up');
                break;
                case 40: // down arrow
                circleInstance.walk('down');
                break;
                case 37: // left arrow
                circleInstance.walk('left');
                break;
                case 39: // right arrow
                circleInstance.walk('right');
                break;
            }
        };
        window.onkeyup = function () {
            if (circleInstance.direction !== 'no') {
                circleInstance.walk('no');
            }
        }
    }

    walk(direction)
    {
        if (!direction) {
            return;
        }

        const newDirection = direction.toLowerCase();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
        }

        let column = {
            'no' : 0,
            'right': 1,
            'down' : 2,
            'left': 3,
            'up': 4
        }[newDirection];

        this.sx = column * this.frameWidth,
        this.sy = 0;
    }
}
