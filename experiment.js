/* 
Created by Teodora Vekony (vekteo@gmail.com)
MEMO Team (PI: Dezso Nemeth)
Lyon Neuroscience Research Center
Universite Claude Bernard Lyon 1

Github:https://github.com/vekteo/Nback_JSPsych
*/

const trialDuration = 1500;
const stimulusDuration = 500;
const buttonToPressForTarget = ["f","j"];
const feedBackDuration = 1000;
let level = 2;
let nbackStimuli = {};
let instructions;

/* create timeline */
let timeline = [];

const trialStructure = {
  type: "html-keyboard-response",
};

/* define messages */

const welcome = {... trialStructure, stimulus: "<h2>Welcome to the task!</h2><h2>Press any key to begin.</h2>" };    
const afterPractice = {... trialStructure, stimulus: "<p>Good! The task start now. From now on, you won't receive feedback about your answer.</p><br><p>Press any button to start the task!</p>" };
const betweenBlockRest = {... trialStructure, stimulus: "<p>Now you can rest a little.</p><br><p>Press any button to continue the task!</p>" };

/*create blocks*/

setArrays()

if (level === 0) {
    defineNullBack()
} else if (level === 1) {
    defineOneBack()
} else if (level === 2) {
    defineTwoBack()
}

createBlocks(nbackStimuli.practiceList, nbackStimuli.stimuliPractice, level)
createBlocks(nbackStimuli.stimuliListFirstBlock, nbackStimuli.stimuliFirstBlock, level)
createBlocks(nbackStimuli.stimuliListSecondBlock, nbackStimuli.stimuliSecondBlock, level)

/* define practice feedback trials */
const feedbackCorrect = {
  ... trialStructure,
  stimulus: '<div style="font-size:40px; color: green">Correct!</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: feedBackDuration,
  data: {test_part: 'feedback'}
}

const feedbackWrong = { ... feedbackCorrect, stimulus: '<div style="font-size:40px; color: red">Wrong!</div>' }
const feedbackNo = { ... feedbackCorrect, stimulus: '<div style="font-size:40px; color: red">You did not respond!</div>' }

/* define task trials */
const fixation = {
  ... trialStructure,
  stimulus: '<div style="font-size:30px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: trialDuration,
  data: {test_part: 'fixation'}
}

const test = {
  ... trialStructure,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: buttonToPressForTarget,
  data: jsPsych.timelineVariable('data'),
  trial_duration: stimulusDuration,
  stimulus_duration: stimulusDuration,
  on_finish: function(data){
    if (data.correct_response == "f" && data.key_press == 70){
        data.correct_rejection = 1;
    } else {
        data.correct_rejection = 0;
    }
    if (data.correct_response == "j" && data.key_press == 70){
        data.miss = 1;
    } else {
        data.miss = 0;
    }
    if (data.correct_response == "j" && data.key_press == 74){
        data.hit = 1;
    } else {
        data.hit = 0;
    }
    if (data.correct_response == "f" && data.key_press == 74){
        data.false_alarm = 1;
    } else {
        data.false_alarm = 0;
    }
  },
}

/* define conditional timeline elements */

const feedBackC = {
  timeline: [feedbackCorrect],
  timeline_variables: feedbackCorrect.data,
    conditional_function: function () {
        let data = jsPsych.data.get().last(1).values()[0];
        return data.hit == 1 || data.correct_rejection == 1
    }
}

const feedBackW = {
  timeline: [feedbackWrong],
  timeline_variables: feedbackWrong.data,
    conditional_function: function () {
        let data = jsPsych.data.get().last(1).values()[0];
        return data.hit == 0 || data.correct_rejection == 0
    }
}

const feedBackN = {
    timeline: [feedbackNo],
    timeline_variables: feedbackNo.data,
      conditional_function: function () {
          let data = jsPsych.data.get().last(1).values()[0];
          return data.hit === 0 && data.correct_rejection === 0 && data.miss === 0 && data.false_alarm === 0
      }
  }

/* define timeline elements */
 
const timelineElementStructure = {
    repetitions: 1,
    randomize_order: false,
}

const practice = { ... timelineElementStructure, timeline_variables: nbackStimuli.stimuliPractice, timeline: [fixation, test, feedBackN, feedBackC, feedBackW] }
const firstBlock = { ... timelineElementStructure, timeline_variables: nbackStimuli.stimuliFirstBlock, timeline: [fixation, test] }
const secondBlock = { ... firstBlock, timeline_variables: nbackStimuli.stimuliSecondBlock }


const debriefBlock = {
  type: "html-keyboard-response",
  stimulus: function() {
    let trials = jsPsych.data.get().filter({test_part: 'test'}); 
    let correct_trials = trials.filter({hit: 1, correct_rejection: 1})
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());

    return "<p>You responded correctly on "+accuracy+"% of the trials.</p>"+
    "<p>Your average response time was "+rt+" ms.</p>"+
    "<p>Press any key to quit. Thank you!</p>";
  }
};


timeline.push(welcome, instructions, practice, afterPractice, firstBlock, betweenBlockRest, secondBlock, debriefBlock);

/* start the experiment */
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.get().localSave("csv", "output.csv");
  }
});