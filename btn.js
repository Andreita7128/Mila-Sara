class Btn {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x - (width/2);
        this.y = y - (height/2);
        this.width = width;
        this.height = height;
    }

    show() {
        image(this.image, this.x, this.y)
    }

    click() {
        const widthB = this.x + this.width;
        const heightB = this.y + this.height;
        let btnClick = false;
        if (this.x < mouseX && mouseX < widthB && this.y < mouseY && mouseY < heightB) {
            btnClick = true;
        return btnClick;
        }
    }
}