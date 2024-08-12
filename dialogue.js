class Dialogue {
    constructor(image, text) {
        this.image = image;
        this.text = text;

    }

    show() {
        image(this.image, 50, 500);
        fill(0)
        textSize(16)

        let x = 700
        let y = 500
        rect(150, x, 700, y)


        text(this.text, 850, 500)
    }
}