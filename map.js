class Map {
    constructor(size, bg, tree, grass, pic, wood, btfy) {
        this.size = size;
        this.bg = bg;
        this.tree = tree;
        this.btfy = btfy;
        this.pic = pic;
        this.wood = wood;
        this.grass = grass;
    }

    show(level) {
        image(this.bg, 0, 0)
        for (let i = 0; i < 27; i += 1) {
            for (let j = 0; j < 15; j += 1) {
                if (level[j][i] === 0) {
                    fill(224, 0);
                    noStroke();
                    rect((i * this.size), (j * this.size), this.size, );
                } else if (level[j][i] === 1) {
                    fill(0, 0);
                    rect((i * this.size), (j * this.size), this.size, );
                } else if (level[j][i] === 2) {
                    fill(120, 0);
                    rect((i * this.size), (j * this.size), this.size, );
                } else if (level[j][i] === 3) {
                    image(this.tree, ((i - 0.04) * this.size), ((j - 1.02) * this.size), this.size + 14, this.size * 2 + 14)
                } else if (level[j][i] === 4) {
                    image(this.grass, ((i - 0.04) * this.size), ((j - 0.02) * this.size), this.size + 14, this.size + 14)
                } else if (level[j][i] === 5) {
                    image(this.pic, ((i - 0.03) * this.size), ((j - 0.02) * this.size), this.size + 4, this.size + 4)
                } else if (level[j][i] === 6) {
                    image(this.wood, ((i - 0.04) * this.size), ((j + 0.04) * this.size), this.size + 14, this.size + 4)
                } else if (level[j][i] === 7) {
                    image(this.btfy, ((i - 0.03) * this.size), ((j - 0.03) * this.size), this.size + 5.5, this.size + 4)
                }
            }
        }
    }

    checkInteraction(pcFil, pcCol, level) {
        let numbers = [];
        let pos = 0
        if (level[pcCol][pcFil] === 8) {
            if (level[pcCol][pcFil + 1] === undefined) {
                numbers.push(0, level[pcCol][pcFil - 1], level[pcCol + 1][pcFil], level[pcCol - 1][pcFil])
            } else if (level[pcCol][pcFil - 1] === undefined) {
                numbers.push(level[pcCol][pcFil + 1], 0, level[pcCol + 1][pcFil], level[pcCol - 1][pcFil])
            } else if (level[pcCol + 1][pcFil] === null) {
                numbers.push(level[pcCol][pcFil + 1], level[pcCol][pcFil - 1], 0, level[pcCol - 1][pcFil])
            } else if (level[pcCol - 1][pcFil] === undefined) {
                numbers.push(level[pcCol][pcFil + 1], level[pcCol][pcFil - 1], level[pcCol + 1][pcFil], 0)
            } else {
                numbers.push(level[pcCol][pcFil + 1], level[pcCol][pcFil - 1], level[pcCol + 1][pcFil], level[pcCol - 1][pcFil])
            }
            let maxNumber = Math.max(...numbers);
            pos = maxNumber
        }
        return pos;
    }

    interaction(pcFil, pcCol, level) {
        let result = null;
        if (keyCode === 32) {
            result = this.checkInteraction(pcFil, pcCol, level);
        }
        return result;
    }

    changeBg(pcFil, pcCol, level) {
        let change = false;
        if (level[pcCol][pcFil] === 10) {
            change = true;
        }
        return change
    }

    setBg(i) {
        this.bg = i;
    }

    setTree(i) {
        this.tree = i;
    }

    setBtfy(i) {
        this.btfy = i;
    }

    setPic(i) {
        this.pic = i;
    }

    setWood(i) {
        this.wood = i;
    }

    setGrass(i) {
        this.grass = i;
    }
}