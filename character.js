class Character
{
    constructor (canvas, x, y, source, numColumns = 4, numRows = 4)
    {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.numColumns = numColumns;
        this.numRows = numRows;
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.sprite;
        this.currentFrame = 0;
        this.loadImage(source);
    }

    loadImage(source)
    {
        if (this.sprite) {
            return;
        }

        this.sprite = new Image();
        this.sprite.onload = () =>
        {
            this.frameWidth = this.sprite.width / this.numColumns;
            this.frameHeight = this.sprite.height / this.numRows;
        };
        this.sprite.src = source;
    }

    getXDistance() {
        return this.frameWidth;
    }

    getYDistance() {
        return this.frameHeight;
    }

    getXDisplacement(secondsPassed) {
        let newX = this.x;
        if (this.direction === 'left') {
            newX = this.x - (this.getXDistance() * secondsPassed);
        }
        if (this.direction === 'right') {
            newX = this.x + (this.getXDistance() * secondsPassed);
        }
        return this.x = newX;
    }

    getYDisplacement(secondsPassed) {
        let newY = this.y;
        if (this.direction === 'down') {
            newY = this.y + (this.getYDistance() * secondsPassed);
        }
        if (this.direction === 'up') {
            newY = this.y - (this.getYDistance() * secondsPassed);
        }
        return this.y = newY;
    }

    draw(secondsPassed)
    {
        this.context.drawImage(
            this.sprite,
            this.sx,
            this.sy,
            this.frameWidth,
            this.frameHeight,
            this.getXDisplacement(secondsPassed),
            this.getYDisplacement(secondsPassed),
            this.frameWidth,
            this.frameHeight
        );
    }

    walk(direction)
    {
        if (!direction) {
            return;
        }

        const newDirection = direction.toLowerCase();

        let directionRow = {
            'no': 0,
            'down' : 1,
            'right': 2,
            'up': 3,
            'left': 4
        }[newDirection];

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            clearInterval(this.walkInterval);
        }

        this.currentFrame++;

        let maxFrame = this.numColumns * this.numRows - 1;
        if (this.currentFrame > maxFrame) {
            this.currentFrame = 0;
        }

        let column = this.currentFrame % this.numColumns;
        let row = Math.floor(this.currentFrame / this.numColumns);

        this.sx = column * this.frameWidth;
        this.sy = directionRow * this.frameHeight;
    }
}
