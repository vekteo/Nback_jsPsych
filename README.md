# Verbal N-back Task (jsPsych)

<p>This repository provides a <b>Verbal N-back task</b>, a continuous performance task commonly used to assess <b>working memory capacity</b>. The task is implemented using the <b>jsPsych</b> library.</p>

* **Original Concept:** Kirchner, W. K. (1954)
* **jsPsych Framework:** de Leeuw, J. R. (2015)

---

<h2>🚀 Getting Started</h2>

<p>To launch the task, simply open the <b>`index.html`</b> file located in either the <b>`offline`</b> or <b>`online`</b> folder.</p>

| Folder | Subject ID & Session | Use Case |
| :--- | :--- | :--- |
| **`offline`** | Subject and session numbers can be customized upon startup. | Local testing, lab settings. |
| **`online`** | A 15-character long random subject ID is automatically generated. | Online data collection. |

### Browser Requirements

<p>The task is compatible with most modern browsers. <b>Chrome is recommended</b>.</p>

<p>Incompatible Browsers: Safari and Internet Explorer.</p>

---

<h2>🧠 Task Structure and Procedure</h2>

<p>In this task, single letters are presented consecutively on the screen. Participants are required to press the "J" key for target elements and the "F" key for non-target elements. The definition of a target stimulus varies depending on the N-back level.</p>

### Procedure Flow

<ol>
<li>Written instructions are displayed at the start.</li>
<li>A 10-trial practice block is performed. During practice, immediate feedback ("Correct", "Wrong", "You did not respond") is provided.</li>
<li>The main task consists of <b>two 50-trial blocks</b> (100 trials total).</li>
<li>A self-paced rest period is inserted between the two main blocks.</li>
<li>Upon completion, participants receive debriefing feedback on their overall success rate and reaction time.</li>
</ol>

---

<h2>⚙️ Task Levels and Stimuli</h2>

### The N-back Levels

<p>The task level is controlled by the <b>`level`</b> variable, configurable in <b>`parameters.js`</b>. Available levels are 0-back, 1-back, 2-back, and 3-back.</p>

<ul>
<li>**0-back:** The target element is the fixed letter "**X**" ($n=\text{X}$).</li>
<li>**1-back:** The target is any letter that is the same as the letter presented immediately prior ($n=n-1$).</li>
<li>**2-back:** The target is any letter that is the same as the letter presented **2** trials earlier ($n=n-2$).</li>
<li>**3-back:** The target is any letter that is the same as the letter presented **3** trials earlier ($n=n-3$).</li>
</ul>

### Stimulus Parameters

<p>Ten phonologically distinct letters are used as stimuli: B, K, Q, T, H, M, N, P, X, R. The stimuli are presented in a fixed pseudo-random order.</p>

| Parameter | Value | Details |
| :--- | :--- | :--- |
| **Stimulus Duration** | 500 ms | How long the letter is on screen. |
| **Interstimulus Interval (ISI)** | 1500 ms | Time from stimulus offset to the next onset. |
| **Total Trials** | 100 trials | **2** blocks of 50 trials per level. |
| **Target Ratio** | 20% | Maintained across all levels (20 target trials vs. 80 non-target trials). |

<p>For the 0-back version, the fixed target "**X**" appears 20 times. For the 1-back, 2-back, and 3-back versions, each of the 10 letters is presented 10 times, serving as a target twice (once per block).</p>

<img src="static/images/example.png" width="700px"/> Example for stimulus presentation in the 2-back task.

---

<h2>💾 Output File Data</h2>

<p>After the task concludes, a .csv output file containing trial-by-trial data and descriptive statistics is saved to the local machine.</p>

### Trial-Level Data Columns

| Variable | Description |
| :--- | :--- |
| **`subject`** | 15-char random ID (online) or custom number (offline). |
| **`session`** | Custom session number (offline version only). |
| **`rt`** | Reaction time (in ms). |
| **`test\_part`** | The part of the task (e.g., fixation, test, feedback, debrief). |
| **`correct\_response`** | The expected key press ("j" or "f"). |
| **`block`** | The block number (0: practice, 1: first block, 2: second block). |
| **`trial\_number`** | The trial number within the block. |
| **`target`** | Whether the stimulus was a target (Boolean). |
| **`letter`** | The letter presented. |
| **`hit`** | Target correctly identified as target (1 = Yes, 0 = No). |
| **`miss`** | Target incorrectly identified as non-target (1 = Yes, 0 = No). |
| **`false\_alarm`** | Non-target incorrectly identified as target (1 = Yes, 0 = No). |
| **`correct\_rejection`** | Non-target correctly identified as non-target (1 = Yes, 0 = No). |
| *Other jsPsych:* | `success`, `trial\_type`, `trial\_index`, `time\_elapsed`, `internal\_code\_id`, `browser\_events`, `view\_history`, `stimulus`, `key\_press`. |

### Summary Statistics (STAT\_ Columns)

<p>Columns prefixed with `STAT\_` provide descriptive statistics, excluding practice trials.</p>

| Statistic Variable | Description |
| :--- | :--- |
| **`STAT_nr_hit`** | Number of hits. |
| **`STAT_nr_miss`** | Number of misses. |
| **`STAT_nr_false_alarm`** | Number of false alarms. |
| **`STAT_nr_correct_rejection`** | Number of correct rejections. |
| **`STAT_nr_response`** | Number of trials with a response. |
| **`STAT_nr_no_response`** | Number of trials with no response. |
| **`STAT_accuracy`** | Overall accuracy (Correct responses / Total responses, in percentage). |
| **`STAT_dprime`** | D-prime ($d'$) calculated from the normalized hit rate and false alarm rate. |
| **`STAT_rt_mean` / `STAT_rt_median`** | Overall mean/median Reaction Time (RT) in ms. |
| **`STAT_hit_mean` / `STAT_hit_median`** | Mean/median RT for hit trials in ms. |
| **`STAT_false_alarm_mean` / `STAT_false_alarm_median`** | Mean/median RT for false alarm trials in ms. |
| **`STAT_correct_rejection_mean` / `STAT_correct_rejection_median`** | Mean/median RT for correct rejection trials in ms. |
| **`STAT_miss_mean` / `STAT_miss_median`** | Mean/median RT for miss trials in ms. |

---

<h2>⚙️ Setting Options</h2>

<p>The following key experimental parameters can be adjusted by modifying the `parameters.js` file:</p>

<ul>
<li>`level` Sets the N-back difficulty (0, 1, 2, or 3).</li>
<li>`trial_duration`: Presentation time of the fixation cross.</li>
<li>`stimulus_duration`: Presentation time of the letters.</li>
<li>`feedback_duration`: Presentation time of feedback during the practice block.</li>
<li>`language`: Sets the program language (available: `english (en)`, `hungarian (hu)`).</li>
</ul>

---

<h2>📚 Citation</h2>

<p>If you utilize this script in your research, please include the following citation in your manuscript:</p>

Vékony, T. (2021). Verbal N-back task created with jsPsych (Version 1.0.0) [Computer software]. https://doi.org/10.5281/zenodo.7100178

<a href="https://zenodo.org/badge/latestdoi/335255298"><img src="https://zenodo.org/badge/335255298.svg" alt="DOI"></a>
