# N-back_JS
 
Verbal n-back task created with the JSPSych library (<a href="https://link.springer.com/article/10.3758/s13428-014-0458-y">de Leeuw, J. R., 2015</a>).

In the task, letters are presented on the screen sequentially. The users' task is to press the "J" key on the keyboard for the target elements, and the "F" for the non-target elements.

<h2>N-back levels</h2>
Depending on the value of the "level" variable, 0-back, 1-back or 2-back will be performed.
<ul>
 <li><strong>0-back:</strong>The target element is the letter "X".</li>
 <li><strong>1-back:</strong>The target is any letters which were preceeded by the same letter.</li> 
 <li><strong>2-back:</strong> The target is any letters which were preceeded by the same letter 2 trials earlier.</li>
</ul>

<h2>Stimulus presentation parameters</h2>
Ten, phonologically distint letters are used as stimuli (B, K, Q, T, H, M, N, P, X, R). The letters are presented in a pseudo-random order. Each letter is presented for 500 ms with an interstimulus interval of 1500 ms. Stimuli are presented in two 50-trials block (100 trials alltogether at each level). In the 1-back and 2-back versions, each letter is presented 10 times, and all of them serves as target 2 times. In the 0-back version, the target X is presented 20 times. Therefore, the target-ratio is set to 20% at each level (20 target trials vs. 80 non-target trials).

<h2>Structure of the task</h2>
The task begins with written instructions. Before the two blocks, a 10-trial practice is implemented. During the practice, the users receive feedback about the answer (Correct, Wrong, You did not respond). After the practice, the two 50-trials long task beging. Between blocks, a self-paced rest period is inserted. After the end of the second block, the users receive feedback about there overall success rate.

<h2>Output file</h2>
The output is saved in .csv format to the local machine.
