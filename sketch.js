let bgMusic;
let size;
let pcCol;
let pcFil;
let level;
let player;
let allLevels;
let actualLvl;
let pjDir;
let screen;
let playBtn;
let startBg;
let instructions;
let instructions2
let backBtn;
let nextBtn;
let gameBgs;
let imageBgChange;
let change1;
let countDiary;
let diaryPages;
let storyImgs;
let actualStory;
let setImages;

function preload() {
	gameBgs = [loadImage("./images/bg.png"), loadImage("./images/bg2.png")]
	startBg = loadImage("./images/others/start.png");
	instructions = [loadImage("./images/others/instructions1.png"), loadImage("./images/others/instruction2.png")]
	diaryPages = [loadImage("./images/diary/1.png"), loadImage("./images/diary/2.png"), loadImage("./images/diary/3.png"), loadImage("./images/diary/4.png"), loadImage("./images/diary/5.png"), loadImage("./images/diary/5.png")];
	storyImgs = [loadImage("./images/start/1.png"), loadImage("./images/start/2.png"), loadImage("./images/start/3.png"), loadImage("./images/start/4.png"), loadImage("./images/start/5.png"), loadImage("./images/start/6.png"),
		loadImage("./images/start/7.png"), loadImage("./images/start/8.png"), loadImage("./images/start/9.png"), loadImage("./images/start/10.png"), loadImage("./images/start/11.png"), loadImage("./images/start/12.png"),
		loadImage("./images/start/13.png"), loadImage("./images/start/14.png"), loadImage("./images/start/15.png"), loadImage("./images/start/16.png"), loadImage("./images/start/16.png")
	]
	bgMusic = createAudio("./music/bg.wav")
	setImages = [loadImage("./images/tree.png"), loadImage("./images/grass.png"), loadImage("./images/pic.png"), loadImage("./images/wood.png"), loadImage("./images/btfy.png")]
}

function setup() {
	size = 72;
	createCanvas((size * 27), (size * 15));
	pcCol = 7;
	pcFil = 0;
	level = new Map(size, gameBgs[0], loadImage("./images/pageTree.png"), loadImage("./images/pageGrass.png"), loadImage("./images/pagePic.png"), loadImage("./images/pageWood.png"), loadImage("./images/pageBtfy.png"));
	allLevels = new ArraysLvl();
	actualLvl = allLevels.level1;
	player = new Sara(size, pcFil, pcCol, actualLvl, loadImage("./images/player/1.png"), loadImage("./images/player/2.png"), loadImage("./images/player/4.png"), loadImage("./images/player/3.png"))
	screen = "game";
	playBtn = new Btn(loadImage("./images/others/playBtn.png"), (size * 27) / 2, 900, 246, 105);
	instructions2 = false;
	backBtn = new Btn(loadImage("./images/others/backBtn.png"), 375, 850, 200, 60);
	nextBtn = new Btn(loadImage("./images/others/nextBtn.png"), 1515, 850, 200, 60);
	imageBgChange = null;
	change1 = 0;
	countDiary = 0;
	actualStory = 0;
}

function draw() {
	switch (screen) {
		case "start":
			image(startBg, 0, 0);
			playBtn.show();
			break;

		case "instructions":
			fill(171, 53, 129, 15);
			rect(0, 0, (size * 27), (size * 15));
			image(instructions[0], 0, 0);
			nextBtn.show();
			if (instructions2 === true) {
				image(instructions[1], 0, 0);
				nextBtn.show();
				backBtn.show();
			}
			break;

		case "game":
			if (change1 !== 0) {
				if (imageBgChange === 3) {
					level.setTree(setImages[0]);
				} else if (imageBgChange === 4) {
					level.setGrass(setImages[1]);
				} else if (imageBgChange === 5) {
					level.setPic(setImages[2]);
				} else if (imageBgChange === 6) {
					level.setWood(setImages[3]);
				} else if (imageBgChange === 7) {
					level.setBtfy(setImages[4]);
				}
			}
			level.show(actualLvl)
			player.show()
			break;

		case "page":
			image(diaryPages[countDiary], 0, 0)
			break;

		case "story":
			image(storyImgs[actualStory], 0, 0, 1945)
			bgMusic.play()
			break;


		default:
			break;
	}
}

function mousePressed() {

	switch (screen) {
		case "start":
			if (playBtn.click()) {
				screen = "story"
			}
			break;

		case "instructions":
			if (nextBtn.click() && instructions2 === false) {
				instructions2 = true;
			} else if (instructions2 === true && backBtn.click()) {
				instructions2 = false;
			} else if (nextBtn.click() && instructions2 === true) {
				screen = "game"
			}
			break;

		case "game":

			break;

		case "page":

			break;

		case "story":
			if (actualStory < 16) {
				console.log(actualStory)
				actualStory++;
			} else if (actualStory = 16) {
				screen = "instructions"
			}
			break;

		default:
			break;
	}
}

function keyPressed() {

	switch (screen) {
		case "game":

			if (level.changeBg(player.getFil(), player.getCol(), actualLvl)) {
				actualLvl = allLevels.level2;
				level.setBg(gameBgs[1])
				player.setFil(0);
				player.setCol(7);
				player.truePos()
				actualLvl = allLevels.level2;
				player.setLevel(actualLvl)
			}
			player.move()
			break;

		case "page":

			break;

		default:
			break;
	}
}

function keyReleased() {
	switch (screen) {
		case "game":
			if (level.interaction(player.getFil(), player.getCol(), actualLvl) >= 0) {
				change1++;
				imageBgChange = level.interaction(player.getFil(), player.getCol(), actualLvl);
			}
			break;
		}
	}