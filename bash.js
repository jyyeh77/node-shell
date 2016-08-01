var commands = require('./commands');
// var done = function (output){
//     process.stdout.write(output);
//     process.stdout.write('\nprompt > ');
// }

process.stdout.write('prompt > ');
process.stdin.on('data', function(data) {
  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g);
  // console.log(cmdList);
  var inputArr = cmdList.map(function(cmd){
    return cmd.trim().split(' ');
  })
  // var input = data.toString().trim().split(' ');
  // console.log(inputArr);
  var cmd = inputArr[0][0];
  var firstFile = inputArr[0].slice(1)
    commands[cmd](null, firstFile, done,inputArr);
});

function done(output,inputArr) {
  inputArr.shift();
  if (inputArr.length > 0){
    commands[inputArr[0][0]](output, null, done,inputArr)
  }
  else {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  }
}



