function setArrays (){
  nbackStimuli.stimuliFirstBlock = [];
  nbackStimuli.stimuliSecondBlock = [];
  nbackStimuli.stimuliPractice = [];
  nbackStimuli.correctResponse;
  nbackStimuli.target;
}


function defineNullBack() {
  nbackStimuli.practiceList = ["B", "P", "X", "K", "H", "M", "Q", "Q", "X", "N","T"];
  nbackStimuli.stimuliListFirstBlock = ["R", "B", "Q", "N", "Q", "K", "X", "X", "N", "R", "B", "X", "M", "X", "X", "T", "R", "X", "P", "P", "M", "M", "Q", "K", "T", "P", "X", "H", "N", "T", "H", "H", "Q", "N", "R", "K", "M", "K", "B", "X", "K", "T", "B", "X", "R", "P", "N", "H", "B", "X"]
  nbackStimuli.stimuliListSecondBlock = ["H", "Q", "X", "R", "M", "R", "Q", "H", "Q", "X", "H", "X", "T", "Q", "B", "N", "K", "P", "K", "R", "B", "X", "X", "R", "X", "X", "N", "K", "P", "N", "P", "X", "T", "P", "T", "B", "H", "M", "M", "Q", "N", "M", "K", "X", "X", "M", "T", "H", "B", "P"]
  instructions = {... trialStructure, stimulus: "<p>First, a fixation cross will appear on the screen. After that, <strong>a letter</strong> will appear. Your task will be <strong>to press the button 'J' if you see the letter 'X'</strong> on the screen. Otherwise, press the <strong>button 'F'</strong>.<br><p>Try to be as fast and as accurate as possible!</p><br><p>Press any button to start the task!</p>" };
}

function defineOneBack() {
  nbackStimuli.practiceList = ["B", "P", "K", "K", "H", "M", "Q", "Q", "X", "N","T"];
  nbackStimuli.stimuliListFirstBlock = ["H", "H", "T", "X", "H", "N", "X", "B", "N", "M", "X", "X", "B", "R", "X", "Q", "B", "Q", "T", "T","Q", "M", "R", "N","P", "P", "B", "B", "P","M",  "R", "R", "N", "N", "K", "Q", "Q", "K", "K", "T", "P", "K", "P", "M", "M", "K",  "R", "H", "T", "H"]
  nbackStimuli.stimuliListSecondBlock = ["K", "R", "N","P","H", "B","B","T", "H", "H",  "X", "K", "M", "K", "K", "P",  "P",  "B", "X", "M", "X", "X", "R", "Q", "N", "H", "P", "Q", "Q","H", "P", "B", "N", "M", "M","B", "K", "M", "Q", "X", "N",  "N", "T", "R", "R", "T", "T", "R", "T", "Q"]
  instructions = {... trialStructure, stimulus: "<p>First, a fixation cross will appear on the screen. After that, <strong>a letter</strong> will appear. Your task will be <strong>to press the button 'J' if the letter on the screen is the same as the previous one</strong>. Otherwise, press the <strong>button 'F'</strong>.<br><p>Try to be as fast and as accurate as possible!</p><br><p>Press any button to start the task!</p>" };
}

function defineTwoBack() {
  nbackStimuli.practiceList = ["B", "K", "P", "K", "H", "Q", "M", "Q", "X", "N","T"];
  nbackStimuli.stimuliListFirstBlock = ["H", "M", "N", "K", "B", "K", "R", "T", "K", "B", "X", "R", "K", "R", "N", "X", "Q", "X", "T", "M", "Q", "P", "R", "H", "B", "M", "B", "P", "M", "N", "M", "H", "Q", "N", "X", "N", "P", "M", "H", "P", "H", "P", "T", "X", "B", "Q", "T", "Q", "T", "K"]
  nbackStimuli.stimuliListSecondBlock = ["T", "B", "T", "B", "Q", "P", "T", "M", "K", "M", "K", "X", "Q", "K", "B", "H", "Q", "P", "Q", "H", "N", "N", "H", "H", "B", "M", "R", "M", "P", "R", "P", "T", "X", "K", "N", "P", "N", "X", "M", "R", "T", "R", "B", "Q", "H", "X", "R", "X", "K", "N"]
  instructions = {... trialStructure, stimulus: "<p>First, a fixation cross will appear on the screen. After that, <strong>a letter</strong> will appear. Your task will be <strong>to press the button 'J' if the letter on the screen is the same as two trials earlier</strong>. Otherwise, press the <strong>button 'F'</strong>.<br><p>Try to be as fast and as accurate as possible!</p><br><p>Press any button to start the task!</p>" };
}