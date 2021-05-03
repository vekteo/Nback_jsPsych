/* 
Created by Teodora Vekony (vekteo@gmail.com)
MEMO Team (PI: Dezso Nemeth)
Lyon Neuroscience Research Center
Universite Claude Bernard Lyon 1

Github:https://github.com/vekteo/Nback_JSPsych
*/

/*************** VARIABLES ***************/

let nbackStimuli = {};
let instruction;
let timeline = [];
const buttonToPressForTarget = ["f","j"];
const trialStructure = { type: "html-keyboard-response" };
const subjectId = jsPsych.randomization.randomID(15)

if (level == 0) {
  instruction = language.instructions0back
} else if (level == 1) {
  instruction = language.instructions1back
} else if (level == 2) {
  instruction = language.instructions2back
} else if (level == 3) {
  instruction = language.instructions3back
}

const instructions = {
  type: "instructions",
  pages: [
      `<h1>${language.welcomePage.welcome}</h1><br><p>${language.welcomePage.clickNext}</p>`,
      `<p>${instruction.letter}</p><p>${instruction.yourTask1}</p><p>${instruction.yourTask2}</p><p>${language.generalInstruction.fastAndAccurate}</p>${instruction.image}<p>${language.generalInstruction.clickNext}</p>`
  ],
  show_clickable_nav: true,
  button_label_next: language.button.next,
  button_label_previous: language.button.previous
}
const betweenBlockRest = {... trialStructure, stimulus: `<p>${language.betweenBlocks.rest}</p><p>${language.betweenBlocks.pressKey}</p>` };
const ready = {... trialStructure, stimulus: `<p>${language.betweenBlocks.continue}</p>` };
const startPractice = {... trialStructure, stimulus: `<p>${language.practice.practice}</p><p>${language.practice.startPractice}<p>`}
const afterPractice = {... trialStructure, stimulus: `<h2>${language.practice.end}</h2><p>${language.task.start}</p><p>${language.task.press}<p>` };

/*create blocks*/

setArrays()

if (level === 0) {
    defineNullBack()
} else if (level === 1) {
    defineOneBack()
} else if (level === 2) {
    defineTwoBack()
} else if (level === 3) {
    defineThreeBack()
}

createBlocks(nbackStimuli.practiceList, nbackStimuli.stimuliPractice, level)
createBlocks(nbackStimuli.stimuliListFirstBlock, nbackStimuli.stimuliFirstBlock, level)
createBlocks(nbackStimuli.stimuliListSecondBlock, nbackStimuli.stimuliSecondBlock, level)

/* define practice feedback trials */

const feedbackCorrect = {
  ... trialStructure,
  stimulus: `<div style="font-size:40px; color: green">${language.feedback.correct}</div>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: feedBackDuration,
  data: {test_part: 'feedback'}
}

const feedbackWrong = { ... feedbackCorrect, stimulus: `<div style="font-size:40px; color: red">${language.feedback.wrong}</div>` }
const feedbackNo = { ... feedbackCorrect, stimulus: `<div style="font-size:40px; color: red">${language.feedback.noResponse}</div>` }

/* define task trials */

const fixation = {
  ... trialStructure,
  stimulus: '<div style="font-size:30px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: fixationDuration,
  data: {test_part: 'fixation'}
}

const test = {
  ... trialStructure,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: buttonToPressForTarget,
  data: jsPsych.timelineVariable('data'),
  trial_duration: letterDuration,
  stimulus_duration: letterDuration,
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

/* define conditional timeline elements for practice */

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

/*************** TIMELINE ***************/
 
const timelineElementStructure = {
    repetitions: 1,
    randomize_order: false,
}

const practice = { ... timelineElementStructure, timeline_variables: nbackStimuli.stimuliPractice, timeline: [fixation, test, feedBackN, feedBackC, feedBackW] }
const firstBlock = { ... timelineElementStructure, timeline_variables: nbackStimuli.stimuliFirstBlock, timeline: [fixation, test] }
const secondBlock = { ... firstBlock, timeline_variables: nbackStimuli.stimuliSecondBlock }


const debriefBlock = {
  type: "html-keyboard-response",
  choices: jsPsych.NO_KEYS,
  stimulus: function() {
    let trials = jsPsych.data.get().filterCustom(function(trial){
      return (trial.block === 1 || trial.block === 2) && trial.test_part === "test";
  }); 
    let correct_trials = trials.filterCustom(function(trial){
      return trial.hit === 1 || trial.correct_rejection === 1;
  })
    let accuracy = Math.round(correct_trials.count()/trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());

    return `
    <h2>${language.end.end}</h2>
    <p>${language.feedback.accuracy}${accuracy}${language.feedback.accuracy2}</p>
    <p>${language.feedback.rt}${rt}${language.feedback.rt2}</p>
    <p>${language.end.thankYou}</p>`;
  },
  trial_duration: 3000,
  on_finish: function(trial) { statCalculation(trial) }
};

jsPsych.data.addProperties({subject: subjectId});
timeline.push({type: "fullscreen", fullscreen_mode: true}, instructions, startPractice, practice, afterPractice, firstBlock, betweenBlockRest, ready, secondBlock, debriefBlock, {type: "fullscreen", fullscreen_mode: false});

/*************** EXPERIMENT START AND DATA UPDATE ***************/

jsPsych.init({
  timeline: timeline,
  on_data_update: function() {
    let interactionData = jsPsych.data.getInteractionData()
    const interactionDataOfLastTrial = interactionData.filter({'trial': jsPsych.data.get().last(1).values()[0].trial_index}).values();
    if (interactionDataOfLastTrial) {
        jsPsych.data.get().last(1).values()[0].browser_events = JSON.stringify(interactionDataOfLastTrial)
    }
  },
  on_close: function() {
    jsPsych.data.get().localSave("csv", `NBack_Subject_${subjectId}_${level}back_quitted_output.csv`);
  },
  on_finish: function() {
    jsPsych.data.get().localSave("csv", `NBack_Subject_${subjectId}_${level}back_output.csv`);
  }
});