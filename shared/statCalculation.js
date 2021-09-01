function statCalculation (trial) {
    let hit = jsPsych.data.get().filterCustom(function(trial){ return (trial.block === 1 || trial.block === 2) && trial.hit === 1} ); 
    let miss = jsPsych.data.get().filterCustom(function(trial){ return (trial.block === 1 || trial.block === 2) && trial.miss === 1} ); 
    let falseAlarm = jsPsych.data.get().filterCustom(function(trial){ return (trial.block === 1 || trial.block === 2) && trial.false_alarm === 1} ); 
    let correctRejection = jsPsych.data.get().filterCustom(function(trial){ return (trial.block === 1 || trial.block === 2) && trial.correct_rejection === 1} ); 

    let phit;
    let pfa;
    if(miss.count() > 0) {
      phit = hit.count()/(miss.count()+hit.count())
    } else {
      phit = hit.count()-0.5/(miss.count()+hit.count())
    }

    if(falseAlarm.count() > 0) {
      pfa = falseAlarm.count()/(falseAlarm.count()+correctRejection.count())
    } else {
      pfa = 0.5/(falseAlarm.count()+correctRejection.count())
    }

    let normHit = NormSInv(phit)
    let normFa = NormSInv(pfa)

    let trials = jsPsych.data.get().filterCustom(function(trial){ return (trial.block === 1 || trial.block === 2) && trial.test_part === "test" && trial.key_press !== null }); //beleszámoljuk-e a hiányzó választ?????
    let correctTrials = jsPsych.data.get().filterCustom(function(trial){ return trial.hit === 1 || trial.correct_rejection === 1 })

    trial.test_part = "debrief";
    trial.STAT_nr_hit = hit.count();
    trial.STAT_nr_miss = miss.count();
    trial.STAT_nr_false_alarm = falseAlarm.count();
    trial.STAT_nr_correct_rejection = correctRejection.count();
    trial.STAT_nr_response = trials.count();
    trial.STAT_nr_no_response = jsPsych.data.get().filterCustom(function(trial){ return ((trial.block === 1 || trial.block === 2) && trial.test_part === "test" && trial.key_press == null) }).count() ;
    trial.STAT_accuracy = ((hit.count()+correctRejection.count())/trials.count()) * 100;
    trial.STAT_rt_mean = Math.round(trials.select('rt').mean());
    trial.STAT_rt_median = Math.round(trials.select('rt').median());
    trial.STAT_hit_rt_mean = Math.round(hit.select('rt').mean());
    trial.STAT_hit_rt_median = Math.round(hit.select('rt').median());
    trial.STAT_false_alarm_rt_mean = Math.round(falseAlarm.select('rt').mean());
    trial.STAT_false_alarm_rt_median = Math.round(falseAlarm.select('rt').median());
    trial.STAT_correct_rejection_rt_mean = Math.round(correctRejection.select('rt').mean());
    trial.STAT_correct_rejection_rt_median = Math.round(correctRejection.select('rt').median());
    trial.STAT_miss_rt_mean = Math.round(miss.select('rt').mean());
    trial.STAT_miss_rt_median = Math.round(miss.select('rt').median());
    trial.STAT_dprime = normHit-normFa;
}