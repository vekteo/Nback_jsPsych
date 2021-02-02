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

    let newElement = { stimulus: "<p class='stimulus'>" + list[i] + "</p>", data: { test_part: 'test', correct_response: correctResponse, block: block, trialNumber: i+1, target: target } }
    stimuli.push(newElement)
  }
}