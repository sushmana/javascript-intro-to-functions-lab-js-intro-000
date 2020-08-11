global.expect = require('expect');

const babel = require('babel-core');
const jsdom = require('jsdom');
const path = require('path');

before(function(done) {
  const babelResult = babel.transformFileSync(
    path.resolve(__dirname, '..', 'index.js'), {
      presets: ['es2015']
    }
  );

  const html = path.resolve(__dirname, '..', 'index.html')

  jsdom.env(html, [], {
    src: babelResult.code,
    virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  }, (err, window) => {
    if (err) {
      return done(err);
    }

    Object.keys(window).forEach(key => {
      global[key] = window[key];
    });

    return done();
  });
});
function shout(string){
  return string.toUpperCase();
}

function whisper(string){
  return string.toLowerCase();
}

function logShout(string){
  console.log(string.toUpperCase);
}

function logWhisper(string){
  console.log(string.toLowerCase);
}

function sayHiToGrandma(string){
  if(string===string.toLowerCase()){
    return "I can't hear you!";
  }
  else if (string===string.toUpperCase()) {
    return "YES INDEED!";
  }
  else(string==="I love you, Grandma."){
    return("I love you, too.");

  }
}
shout("hello")
whisper("HELLO")
logShout("Hello")
logWhisper("hello")
sayHiToGrandma("I love you, Grandma")
