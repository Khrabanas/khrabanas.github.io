console.log("JavaScript alive. Welcome to the console, my curious friend! Please mind my bad coding skills.");
var damage;
var rps;
var ammolvl
var dps;
var hd = "";
function run() {
  hd = "";
  damage = parseFloat(document.getElementById("basedmg").value) + parseFloat(document.getElementById("plusdmg").value);
  rps = parseFloat(document.getElementById("baserps").value) + parseFloat(document.getElementById("plusrps").value);
  dps = damage * rps;
  if (document.getElementById("ammo").checked == true) {
    ammolvl = document.getElementById("ammolvl").value;
    hd = " with HD Ammo at mastery level " + ammolvl;
    if (ammolvl == 1) {
        dps += dps / 4;
    } else if (ammolvl == 2) {
      dps += dps * 0.3;
    } else if (ammolvl == 3) {
      dps += dps * 0.35;
    } else if (ammolvl == 4) {
      dps += dps * 0.40;
    } else {
      dps += dps / 2;
    }
  }
  document.getElementById("output").value += document.getElementById("name").value + " has a DPS of " + dps + hd + "\n";
}
