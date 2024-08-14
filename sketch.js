let poppins;
let bgMusic;
let diaryMusic;
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
let countDiary;
let diaryPages;
let storyImgs;
let actualStory;
let setImages;
let originalImages;
let showPage;
let diaryPage;
let timeOver;

let timerDuration = 0.3 * 60; // 5 minutos en segundos
let remainingTime = timerDuration;
let intervalID;
let timeStart;

function preload() {
	poppins = loadFont("./poppins/Poppins-Medium.ttf")
	gameBgs = [loadImage("./images/bg.png"), loadImage("./images/bg2.png")]
	startBg = loadImage("./images/others/start.png");
	instructions = [loadImage("./images/others/instructions1.png"), loadImage("./images/others/instruction2.png")]
	diaryPages = [loadImage("./images/diary/1.png"), loadImage("./images/diary/2.png"), loadImage("./images/diary/3.png"), loadImage("./images/diary/4.png"), loadImage("./images/diary/5.png"), loadImage("./images/diary/5.png")];
	storyImgs = [loadImage("./images/start/1.png"), loadImage("./images/start/2.png"), loadImage("./images/start/3.png"), loadImage("./images/start/4.png"), loadImage("./images/start/5.png"), loadImage("./images/start/6.png"),
		loadImage("./images/start/7.png"), loadImage("./images/start/8.png"), loadImage("./images/start/9.png"), loadImage("./images/start/10.png"), loadImage("./images/start/11.png"), loadImage("./images/start/12.png"),
		loadImage("./images/start/13.png"), loadImage("./images/start/14.png"), loadImage("./images/start/15.png"), loadImage("./images/start/16.png"), loadImage("./images/start/16.png")
	]
	bgMusic = createAudio("./music/bg.wav")
	diaryMusic = createAudio("./music/diary.wav")
	setImages = [loadImage("./images/tree.png"), loadImage("./images/grass.png"), loadImage("./images/pic.png"), loadImage("./images/wood.png"), loadImage("./images/btfy.png")]
	originalImages = [loadImage("./images/pageTree.png"), loadImage("./images/pageGrass.png"), loadImage("./images/pagePic.png"), loadImage("./images/pageWood.png"), loadImage("./images/pageBtfy.png")]
	diaryPage = loadImage("./images/page.png")
	timeOver = loadImage("./images/others/timeOver.png")
}

function updateTimer() {
	remainingTime--;
	if (remainingTime <= 0) {
		remainingTime = 0;
		clearInterval(intervalID);
		screen = "timeIsOver";
	}
}

function setup() {
	size = 72;
	createCanvas((size * 27), (size * 15));
	pcCol = 7;
	pcFil = 0;
	level = new Map(size, gameBgs[0], originalImages[0], originalImages[1], originalImages[2], originalImages[3], originalImages[4]);
	allLevels = new ArraysLvl();
	actualLvl = allLevels.level1;
	player = new Sara(size, pcFil, pcCol, actualLvl, loadImage("./images/player/1.png"), loadImage("./images/player/2.png"), loadImage("./images/player/4.png"), loadImage("./images/player/3.png"))
	screen = "start";
	playBtn = new Btn(loadImage("./images/others/playBtn.png"), width / 2, 900, 246, 105);
	instructions2 = false;
	backBtn = new Btn(loadImage("./images/others/backBtn.png"), 375, 850, 200, 60);
	nextBtn = new Btn(loadImage("./images/others/nextBtn.png"), 1515, 850, 200, 60);
	imageBgChange = null;
	actualStory = 0;
	countDiary = 0;
	showPage = false;
	textFont(poppins);

	timeStart = false;
}

function showDiaryPages() {
	textSize(50);
	fill(65, 32, 10);
	text(`${countDiary}/5`, width - 220, 105);
	noFill();
	image(diaryPage, width - 120, 50)
}

function reset() {
	console.log("¡Tiempo terminado! Reiniciando...");
	console.log(player.getLevel());
	remainingTime = timerDuration;
	startTime = millis();

	actualLvl = allLevels.level1;
	player.setLevel(actualLvl);
	player.setFil(0);
	player.setCol(7);
	player.truePos()
	screen = "game";
	imageBgChange = null;
	countDiary = 0;
	showPage = false;
	timeStart = false;
	console.log(player.getLevel());

	level.setTree(originalImages[0]);
	level.setGrass(originalImages[1]);
	level.setPic(originalImages[2]);
	level.setWood(originalImages[3]);
	level.setBtfy(originalImages[4]);
	level.setBg(gameBgs[0])

}

function draw() {
	switch (screen) {
		case "start":
			image(startBg, 0, 0);
			playBtn.show();
			break;

		case "instructions":
			bgMusic.stop()
			fill(171, 53, 129, 15);
			rect(0, 0, width, (size * 15));
			image(instructions[0], 0, 0);
			nextBtn.show();
			if (instructions2 === true) {
				image(instructions[1], 0, 0);
				nextBtn.show();
				backBtn.show();
			}
			break;

		case "game":
			bgMusic.loop(0)
			level.show(actualLvl)
			showDiaryPages()
			if (showPage) {
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
				showPage = false;
				screen = "page"
				bgMusic.pause()

			}
			let minutes = floor(remainingTime / 60);
			let seconds = remainingTime % 60;
			let timeDisplay = nf(minutes, 2) + ':' + nf(seconds, 2);

			fill(65, 32, 10);
			textSize(80);
			text(timeDisplay, (width / 2) - 220, 105);

			player.show()
			break;

		case "page":
			diaryMusic.play()
			image(diaryPages[countDiary], 0, 0, 1945)
			break;

		case "story":
			image(storyImgs[actualStory], 0, 0, 1945)
			bgMusic.play()
			break;

		case "timeIsOver":
			image(timeOver, 0, 0, 1945)
			bgMusic.stop();
			diaryMusic.stop()
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
				bgMusic.stop()
				screen = "game"
			}
			break;

		case "story":
			if (actualStory < 16) {
				console.log(actualStory)
				actualStory++;
			} else if (actualStory = 16) {
				screen = "instructions"
			}
			break;

		case "timeIsOver":
			reset()
			break;

		default:
			break;
	}
}

function keyPressed() {

	switch (screen) {
		case "game":
			if (level.interaction(player.getFil(), player.getCol(), actualLvl) !== null && level.interaction(player.getFil(), player.getCol(), actualLvl) !== 0) {
				console.log(level.interaction(player.getFil(), player.getCol(), actualLvl))
				imageBgChange = level.interaction(player.getFil(), player.getCol(), actualLvl);
				showPage = true;
			}
			if (level.changeBg(player.getFil(), player.getCol(), actualLvl)) {
				actualLvl = allLevels.level2;
				level.setBg(gameBgs[1])
				player.setFil(0);
				player.setCol(7);
				player.truePos()
				player.setLevel(actualLvl)
			}



			if (allLevels.level1[player.getCol()][player.getFil()] !== 2 && timeStart === false) {
				timeStart = true;
				intervalID = setInterval(updateTimer, 1000);
				setTimeout(() => {
					screen = "timeIsOver";
				}, timerDuration * 1000);
			}
			player.move()
			break;

		case "page":
			screen = "game"
			countDiary++;
			diaryMusic.stop()
			break;
		default:
			break;
	}
}
