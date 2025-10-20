This polished README is structured for clarity, better flow, and uses more professional language, while retaining all the original HTML and information.

Verbal N-back Task with jsPsych: A Working Memory Measure
Created by the MEMO Team of Lyon Neuroscience Research Center (CRNL) PI: Dezso Nemeth  

<p>This repository provides a Verbal N-back task (<a href="https://psycnet.apa.org/doiLanding?doi=10.1037/h0043688">Kirchner, W. K., 1954</a>) implemented using the jsPsych library (<a href="https://link.springer.com/article/10.3758/s13428-014-0458-y">de Leeuw, J. R., 2015</a>). The N-back task is a continuous performance task commonly used to assess working memory capacity.</p>

<h2>Citation</h2> If you utilize this script in your research, please include the following citation in your manuscript:

Vékony, T. (2021). Verbal N-back task created with jsPsych (Version 1.0.0) [Computer software]. https://doi.org/10.5281/zenodo.7100178

<a href="https://zenodo.org/badge/latestdoi/335255298"><img src="https://zenodo.org/badge/335255298.svg" alt="DOI"></a>

<h2>Task Structure and Procedure</h2> <p>In this task, single letters are presented consecutively on the screen. Participants are required to press the "J" key for target elements and the "F" key for non-target elements. The definition of a target stimulus varies depending on the N-back level.</p>

<p>The procedure is as follows:</p> <ol>  <li>Written instructions are displayed at the start.</li>  <li>A 10-trial practice block is performed. During practice, immediate feedback ("Correct", "Wrong", "You did not respond") is provided.</li>  <li>The main task consists of two 50-trial blocks (100 trials total).</li>  <li>A self-paced rest period is inserted between the two main blocks.</li>  <li>Upon completion, participants receive debriefing feedback on their overall success rate and reaction time.</li> </ol>

<h2>The N-back Levels</h2> The task level is controlled by the level variable, which can be configured in parameters.js. The available levels are 0-back, 1-back, 2-back, and 3-back. <ul>  <li><strong>0-back:</strong> The target element is the fixed letter "X".</li>  <li><strong>1-back:</strong> The target is any letter that is the same as the letter presented immediately prior (

n=n−1
).</li>   <li><strong>2-back:</strong> The target is any letter that is the same as the letter presented 2 trials earlier (

n=n−2
).</li>  <li><strong>3-back:** The target is any letter that is the same as the letter presented 3 trials earlier (

n=n−3
).</li> </ul>

<h2>Stimulus Parameters</h2> <p>Ten phonologically distinct letters are used as stimuli: B, K, Q, T, H, M, N, P, X, R. The stimuli are presented in a fixed pseudo-random order.</p> <ul>  <li>Stimulus Duration: 500 ms</li>  <li>Interstimulus Interval (ISI): 1500 ms (time from offset of one stimulus to onset of the next)</li>  <li>Total Trials: 100 trials (2 blocks of 50 trials) per level.</li>  <li>Target Ratio: Maintained at 20% (20 target trials vs. 80 non-target trials) across all levels.</li> </ul>

<p>For the 0-back version, the fixed target "X" appears 20 times. For the 1-back, 2-back, and 3-back versions, each of the 10 letters is presented 10 times, serving as a target twice (once per block).</p> <img src="static/images/example.png" width="700px"/> Example for stimulus presentation in the 2-back task.

<h2>Output File Details</h2> After the task concludes, a .csv output file containing trial-by-trial data and descriptive statistics is saved to the local machine.

Trial-Level Data Columns
<ul>  <li><strong>success:</strong> Whether fullscreen mode was successfully started/ended (Boolean)</li>  <li><strong>trial_type:</strong> jsPsych trialtype (e.g., fullscreen, instructions, html-keyboard-response)</li>  <li><strong>trial_index:</strong> The sequential number of the trial/event</li>  <li><strong>time_elapsed:</strong> Time elapsed from the start of the program (in ms)</li>  <li><strong>internal_code_id:</strong> Internal node ID of the trial</li>  <li><strong>subject:</strong> A 15-character random ID (online) or customized number (offline)</li>  <li><strong>session:</strong> Customized session number (offline only)</li>  <li><strong>browser_events:</strong> Browser events during the task (e.g., fullscreenenter, blur)</li>  <li><strong>view_history:</strong> Viewing history during instruction trials</li>  <li><strong>rt:</strong> Reaction time (in ms)</li>  <li><strong>stimulus:</strong> Stimulus presented on the screen (in HTML)</li>  <li><strong>key_press:</strong> The JS key code of the key pressed</li>  <li><strong>test_part:</strong> The part of the task (e.g., fixation, test, feedback, debrief)</li>  <li><strong>correct_response:</strong> The expected key press ("j" or "f")</li>  <li><strong>block:</strong> The block number (0: practice, 1: first block, 2: second block)</li>  <li><strong>trial_number:</strong> The trial number within the block (1-10 in practice, 1-50 in main blocks)</li>  <li><strong>target:</strong> Whether the stimulus was a target (Boolean)</li>  <li><strong>letter:</strong> The letter presented</li>  <li>Response Classification (1 = Yes, 0 = No):</li> <ul> <li><strong>correct_rejection:</strong> Non-target correctly identified as non-target</li> <li><strong>miss:</strong> Target incorrectly identified as non-target</li> <li><strong>hit:</strong> Target correctly identified as target</li> <li><strong>false_alarm:</strong> Non-target incorrectly identified as target</li> </ul> </ul>

Statistical (STAT) Columns
<p>Columns prefixed with STAT provide descriptive statistics, excluding practice trials:</p> <ul>  <li>Counts: <ul> <li>STAT_nr_hit: Number of hits</li> <li>STAT_nr_miss: Number of misses</li> <li>STAT_nr_false_alarm: Number of false alarms</li> <li>STAT_nr_correct_rejection: Number of correct rejections</li> <li>STAT_nr_response: Number of trials with a response</li> <li>STAT_nr_no_response: Number of trials with no response</li> </ul> </li>  <li>Performance Metrics: <ul> <li>STAT_accuracy: Overall accuracy (Correct responses / Total responses, in percentage)</li> <li>STAT_dprime: D-prime (

$$d'$$
) calculated from the normalized hit rate and false alarm rate</li> </ul> </li>  <li>Reaction Time (RT) Measures (in ms): <ul> <li>STAT_rt_mean / STAT_rt_median: Overall mean/median RT</li> <li>STAT_hit_mean / STAT_hit_median: Mean/median RT for hit trials</li> <li>STAT_false_alarm_mean / STAT_false_alarm_median: Mean/median RT for false alarm trials</li> <li>STAT_correct_rejection_mean / STAT_correct_rejection_median: Mean/median RT for correct rejection trials</li> <li>STAT_miss_mean / STAT_miss_median: Mean/median RT for miss trials</li> </ul> </li> </ul>

<h2>Setting Options</h2> <p>The following key experimental parameters can be adjusted by modifying the parameters.js file:</p> <ul>  <li>level of the n-back: Sets the task difficulty (0, 1, 2, or 3)</li>  <li>trial_duration: Presentation time of the fixation cross</li>  <li>stimulus_duration: Presentation time of the letters</li>  <li>feedback_duration: Presentation time of feedback during the practice block</li>  <li>language: Sets the program language (available options: english (en), hungarian (hu))</li> </ul>

<h2>How to Start the Task</h2> To launch the task, simply open the index.html file located in either the offline or online folder. <ul> <li>Offline Version: Allows customization of subject and session numbers.</li> <li>Online Version: Automatically allocates a random 15-character subject ID.</li> </ul>

<h2>Browser Requirements</h2> The task is compatible with most modern browsers. Chrome is recommended.

Incompatible Browsers: Safari and Internet Explorer.
