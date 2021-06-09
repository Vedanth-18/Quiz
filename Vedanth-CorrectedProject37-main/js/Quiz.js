class Quiz {
  constructor(){
    this.image = loadImage("bg1.png");
    this.text = loadFont("Font.ttf");
    this.font = loadFont("Font2.ttf");
    this.font = loadFont("Font3.ttf");
    this.gif1 = loadImage("1.gif");
    this.gif2 = loadImage("2.gif");
     this.correct = null;
     this.incorrect = null
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    background(this.image);
    question.hide();
    question.title.hide();
    question.input1.hide();
    question.button.hide();
    question.input2.hide();
    question.option1.hide(); 
    question.option2.hide();
    question.option3.hide();
    question.option4.hide();

    push();
    textStyle(BOLD);
    textSize(35);
    fill("BLACK");
    textStyle(BOLD);
    textSize(50);
    textFont(this.text);
    text("RESULT OF THE QUIZ",200, 120);
    pop();
    
    Contestant.getPlayerInfo();
    console.log(allContestants);
    if(allContestants !== undefined){
      
      push();
      textSize(35);
      fill("BLACK");
      textStyle(BOLD);
      textSize(23);
      textFont(this.text);
      text("NOTE: Correct answers are highlighted in green colour", 150, 220);
     
      var y =235;
      pop();
      for(var plr in allContestants){
        var correctAnswer = "2";
        if(correctAnswer === allContestants[plr].answer){
           //var correct = allContestants[plr].name;
      push()
           fill("#6fe657");
           y+=50;
        textSize(20);
        textStyle(BOLD);
        textFont(this.font);

        text("Well Done " + allContestants[plr].name + "! " + allContestants[plr].answer + " is the correct answer", 150, y);
        
        pop()
         
        }
        else{
        push()
          fill("RED");
          y+=50;
          textSize(20);
          textStyle(BOLD);
          textFont(this.font);

          text("Sorry " + allContestants[plr].name + ", " + allContestants[plr].answer + " is a worng answer ", 150, y);
          text("The correct answer is: Option 2: Envelope", 150, y+30);

          pop()

         
        }
        //text("The correct answer is: Option 2: Envelope", 150, 240);
        // else if(correctAnswer !== allContestants[plr].answer){
        //    //var notCorrect = allContestants[plr].name;
        //    //console.log("notCorrect: " + notCorrect);
        //    fill("#e65c57");
        //    textSize(20);
        //    textStyle(BOLD);
        //    text("The answer given by " + allContestants[plr].name + " is wrong", 150, 300);
        //    text("The correct answer is: Option 2: Envelope", 150, 320);
        // }
       }
       
    }
  }
}
