class Sara {
    constructor(size, pcFil, pcCol, level, image1, image2, image3, image4) {
        this.size = size;
        this.x = ((pcFil) * this.size);
        this.y = ((pcCol - 1) * this.size);
        this.pcFil = pcFil;
        this.pcCol = pcCol;
        this.level = level

        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
    }

    show() {
        if (this.d === 0) {
            image(this.image1, this.x, this.y);
        } else if (this.d === 1) {
            image(this.image2, this.x, this.y);
        } else if (this.d === 2) {
            image(this.image3, this.x, this.y);
        } else {
            image(this.image4, this.x, this.y);
        }
    }

    move() {
        if (key === "d" || key === "D" || keyCode === RIGHT_ARROW) {
            if (this.level[this.pcCol][this.pcFil + 1] !== 1 && this.level[this.pcCol][this.pcFil + 1] !== 4 && this.level[this.pcCol][this.pcFil + 1] !== 5 && this.level[this.pcCol][this.pcFil + 1] !== 6 && this.level[this.pcCol][this.pcFil + 1] !== undefined) {
                this.pcFil++
                this.x = this.x + this.size;
                this.d = 3;
            }
        }

        if (key === "a" || key === "A" || keyCode === LEFT_ARROW) {
            if (this.level[this.pcCol][this.pcFil - 1] !== 1 && this.level[this.pcCol][this.pcFil - 1] !== 4 && this.level[this.pcCol][this.pcFil - 1] !== 5 && this.level[this.pcCol][this.pcFil - 1] !== 6 && this.level[this.pcCol][this.pcFil - 1] !== undefined) {
                this.pcFil--
                this.x = this.x - this.size;
                this.d = 2;
            }
        }
        if (key === "w" || key === "W" || keyCode === UP_ARROW) {
            if (this.level[this.pcCol - 1][this.pcFil] !== 1 && this.level[this.pcCol - 1][this.pcFil] !== 4 && this.level[this.pcCol - 1][this.pcFil] !== 5 && this.level[this.pcCol - 1][this.pcFil] !== 6 && this.level[this.pcCol - 1][this.pcFil] !== undefined) {
                this.pcCol--
                this.y = this.y - this.size;
                this.d = 1;
            }
        }
        if (key === "s" || key === "S" || keyCode === DOWN_ARROW) {
            if (this.level[this.pcCol + 1][this.pcFil] !== 1 && this.level[this.pcCol + 1][this.pcFil] !== 4 && this.level[this.pcCol + 1][this.pcFil] !== 5 && this.level[this.pcCol + 1][this.pcFil] !== 6 && this.level[this.pcCol + 1][this.pcFil] !== undefined) {
                this.pcCol++
                this.y = this.y + this.size;
                this.d = 0;
            }
        }
    }

    truePos(){
        this.x = ((this.pcFil) * this.size);
        this.y = ((this.pcCol - 1) * this.size);
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getFil() {
        return this.pcFil
    }

    getCol() {
        return this.pcCol
    }

    setFil(nFil) {
        this.pcFil = nFil;
    }

    setCol(nCol) {
        this.pcCol = nCol;
    }

    getLevel() {
        return this.level;
    }
    setLevel(nl) {
        this.level = nl;
    }

}