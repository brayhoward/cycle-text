// To make use of this class instantiate a new instance and pass in an array with an element id at index 0,
// optionally pass the interval time in milliseconds to index 1 in the array. After the array pass the words you
// you want to use as individual arguments. Then call the runInfinitely() or runOnce() method on the new instance.
// Example:
// var cycle = new CycleText(["dynamic-text"], "collaborative", "thorough", "fun", "problem-solving", "modern", "Reax")
// cycle.runInfinitely() || cycle.runOnce()

export class CycleText {

  constructor([id, interval = 2500], ...words ) {
    this.words            = words;
    this.adjectivesIndex  = 0;
    this.hasTarget        = !!(document.getElementById(id));
    this.interval         = interval;
    this.wordslength      = this.words.length;
    this.target           = document.getElementById(id);

    // Bind the lexical this scope from the class to the methods we need to access it in.
    this.setNextIndex  = this.setNextIndex.bind(this);
    this.runInfinitely = this.runInfinitely.bind(this);
    this.runOnce       = this.runOnce.bind(this);
  }

  addAnimateIn() {
    let div = this.target;
    div.classList.remove("embellish-text");
    div.classList.remove("cycle-animate-out");
    div.classList.add("cycle-animate-in");
    this.addEmbelishTextIfOnLastWord();
  }

  addAnimateOut() {
    let div = this.target;
    div.classList.remove("cycle-animate-in");
    div.classList.add("cycle-animate-out");
  }

  addEmbelishTextIfOnLastWord() {
    if (this.secondToLastWord()) this.target.classList.add("embellish-text");
  }

  havntLoopedThroughListOnceAlready() {return this.adjectivesIndex > 0}

  insertNextWord() {
    this.addAnimateIn();
    this.target.innerHTML = ` ${this.words[this.adjectivesIndex]}`;
    this.setNextIndex();
  }

  runInfinitely () {
    let interval = this.secondToLastWord() ? this.interval*3.5 : this.interval;
    if (this.hasTarget) {
      this.insertNextWord();

      window.setTimeout(()=>{
        this.addAnimateOut();
        window.setTimeout(()=> {
          this.runInfinitely();
        }, interval*.30);
      }, interval*.70)
    }
  }

  runOnce() {
    if (this.hasTarget) {
      this.insertNextWord();

      if (this.havntLoopedThroughListOnceAlready()) {
        window.setTimeout(()=>{
          this.addAnimateOut();
          window.setTimeout(()=> {
            this.runOnce();
          }, this.interval*.20);
        }, this.interval*.80)
      }
    }
  }

  secondToLastWord() {return this.adjectivesIndex == this.wordslength -1}

  setNextIndex() {
    this.adjectivesIndex = this.adjectivesIndex < this.wordslength -1 ? this.adjectivesIndex += 1 : 0;
  }
}