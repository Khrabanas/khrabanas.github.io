//a simple input and output sequence. May eventually turn into a neural network/genetic thing after more edits.
var text = document.getElementsByName("textbox1").value;
console.log(text);
input1 = 1000;
input2 = -1000;

goal1 = 100;
goal2 = -100;

//defining the runs per cycle and overall runs.
runsOfCycle = 0;
overallRuns = 0;
cycleCount = 0;
//defining success
success = 0;

function selectNode(which,name, val, node1, node2, node3) {
  if (Math.random() <= 1./3) {
    console.log ("node1 selected as " + which + " half for " + name +".");
    val += node1;
  } else if (Math.random() <= 2./3) {
    console.log("node2 selected as " + which + " half for " + name +".");
    val += node2;
  } else {
    console.log("node3 selected as " + which + " half for " + name +".");
    val += node3;
  }
  return val;
}

//run function
function run() {
  //running
  console.log("--------------------------run #" + runsOfCycle +"--------------------------");

  //hidden nodes
  node1 = Math.random() * input1 + Math.random() * input2;
  node2 = Math.random() * input1 + Math.random() * input2;
  node3 = Math.random() * input1 + Math.random() * input2;

  //making outputs


  output1 = selectNode("first", "output1", 0, node1, node2, node3);
  output1 = selectNode("second", "output1", output1, node1, node2, node3);

  output2 = selectNode("first", "output2", 0, node1, node2, node3);
  output2 = selectNode("second", "output2", output2, node1, node2, node3);


  //logging outputs
  console.log("output1 is " + output1 + "to a goal of < " + goal1);
  console.log("output2 is " + output2 + "to a goal of > " + goal2);

  //did output1 meet its goal
  if (output1 < goal1 && 0 < output1) {
    console.log("output1 success");
    success = success + 0.5;
  } else {
    console.log("output1 fail");
  }

  //did output2 meet its goal
  if (output2 > goal2 && 0 > output2) {
    console.log("output2 success");
    success = success + 0.5;
  } else {
    console.log("output2 fail");
  }
  //was there an overall success?
  if (success == 1) {
    success = 0;
    console.log("overall success!");
    runsOfCycle = runsOfCycle + 1;
    overallRuns = overallRuns + 1;
    console.log("has run " + runsOfCycle + " times this cycle");
    runsOfCycle = 0;
    cycleCount = cycleCount + 1;
  } else {
    success = 0;
    console.log("overall failure...")
    runsOfCycle = runsOfCycle + 1;
    overallRuns = overallRuns + 1;
    console.log("has run " + runsOfCycle + " times this cycle");
    run();
  }
}
