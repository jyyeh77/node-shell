var fs = require('fs');
var request = require('request')


module.exports = {
  pwd: function(stdin, filler, done, inputArr) {
    // process.stdout.write(process.cwd());
    // process.stdout.write('\nprompt > ');

    done(process.cwd(), inputArr);
  },
  date: function(stdin, filler, done, inputArr) {
    // process.stdout.write(new Date().toString());
    // process.stdout.write('\nprompt > ');
    done(new Date().toString(), inputArr);
  },
  ls: function(stdin, filler, done, inputArr) {
    fs.readdir('.', function(err, files) {
      var output = '';
      if (err) throw err;
      files.forEach(function(file) {
        output += file.toString() + '\n';
      })
      done(output, inputArr);
    })
  },
  echo: function(stdin, string, done, inputArr) {
    var output = string.join(' ');
    done(output, inputArr);
  },
  cat: function(stdin, files, done, inputArr) {
    console.log(inputArr)
    if (stdin) {
      done(stdin, inputArr);
    } else {
      fs.readFile(files[0], function(err, data) {
        if (err) throw err;
        done(data, inputArr);
      })
    }


  },
  head: function(stdin, files, done, inputArr) {

    if (stdin) {
      done(stdin.split('\n').slice(0, 5).join('\n'), inputArr);

    } else {
      fs.readFile(files[0], function(err, data) {
        if (err) throw err;
        var output = data.toString().split('\n').slice(0, 5).join('\n')
        done(output, inputArr)
      })
    }

  },
  tail: function(stdin, files, done, inputArr) {

    if (stdin) {
      done(stdin.split('\n').slice(-5).join('\n'), inputArr);
    } else {
      fs.readFile(files[0], function(err, data) {
        if (err) throw err;
        var output = data.toString().split('\n').slice(-5).join('\n')
        done(output, inputArr)
      })
    }

  },
  sort: function(stdin, files, done, inputArr) {

    if (stdin) {
      done(stdin.split('\n').sort().join('\n'), inputArr);
    } else {
      fs.readFile(files[0], function(err, data) {
        if (err) throw err;
        var output = data.toString().split('\n').sort().join('\n')
        done(output, inputArr)
      })
    }


  },
  wc: function(stdin, files, done, inputArr) {

    if (stdin) {
      done(stdin.split('\n').length.toString(), inputArr);
    } else {
      fs.readFile(files[0], function(err, data) {
        if (err) throw err;
        var output = data.toString().split('\n').length.toString();
        done(output, inputArr)
      })
    }

  },
  uniq: function(stdin, files, done, inputArr) {

    if (stdin) {
      stdoutput = stdin.split('\n')
      var newstdOutput = stdoutput.filter(function(element, index, self) {
        return index === self.indexOf(element);
      })
      done(newstdOutput.join('\n'), inputArr);
    }
    fs.readFile(files[0], function(err, data) {
      if (err) throw err;
      var output = data.toString().split('\n');
      var newOutput = output.filter(function(element, index, self) {
        return index === self.indexOf(element);
      })
      done(newOutput.join('\n'), inputArr);
    })
  },
  curl: function(stdin, files, done, inputArr) {
    if (stdin) {
      if (stdin.substring(0, 8) !== 'https://') {
        stdin = 'https://' + stdin;
      }
      request(stdin, function(err, response, body) {
        if (err) throw err;
        done(body,inputArr)
      })
    }

    if (files[0].substring(0, 8) !== 'https://') {
      files[0] = 'https://' + file[0];
    }
    request(files[0], function(err, response, body) {
      if (err) throw err;
      done(body,inputArr)
    })
  },
  grep: function(stdin,string,done,inputArr) {
    var linearray = stdin.split('\n');
    var regex = string
    var outputstring = ""
    linearray.forEach(function(line){
      if (string.test(line)) {
        outputstring += line + '\n'
      }
    })
    done(outputstring,inputArr)
  }

}

// <--HELPER FUNCTIONS-->
