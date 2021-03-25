function createBlocks(list, stimuli, level){
  for (let i = 0; i < list.length; i++) {

    if (level === 0){
      targetStimulus = "X"
    }
    else {
      targetStimulus = list[i-level];
    }

    if(i > 0) {
      if (list[i] === targetStimulus){
        correctResponse = "j" 
        target = 1;
      } else {
        correctResponse = "f"
        target = 0;
      }
    } else {
      correctResponse = "f"
      target = 0;
    }
    
    if (list == nbackStimuli.practiceList){
      block = 0;
    } else if (list == nbackStimuli.stimuliListFirstBlock) {
      block = 1
    } else {
      block = 2
    }

    let newElement = { stimulus: "<p class='stimulus'>" + list[i] + "</p>", data: { test_part: 'test', level: level, correct_response: correctResponse, block: block, trial_number: i+1, target: target, letter: list[i] } }
    stimuli.push(newElement)
  }
}