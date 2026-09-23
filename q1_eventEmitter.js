// Q1. EventEmitter & Event Loop - School Bell System
const EventEmitter = require('events');

// Create an emitter instance for the school bell system
const schoolBell = new EventEmitter();

// Listener for "classStart" event
schoolBell.on('classStart', () => {
  console.log('🔔 Bell rings! Class has started.');
});

// Listener for "classEnd" event
schoolBell.on('classEnd', () => {
  console.log('🔔 Bell rings! Class has ended.');
});

console.log('--- School Bell System ---');

// Emit classStart immediately
schoolBell.emit('classStart');

// setTimeout - runs after at least the given delay (macrotask, timer phase)
setTimeout(() => {
  console.log('⏰ setTimeout: Ring bell! (after 0ms delay - timer phase)');
}, 0);

// setImmediate - runs in the "check" phase of the event loop,
// generally right after I/O events, before timers in some cases
setImmediate(() => {
  console.log('⏰ setImmediate: Ring bell! (check phase)');
});

// process.nextTick - runs before any other event loop phase,
// immediately after the current operation finishes (microtask queue)
process.nextTick(() => {
  console.log('⏰ process.nextTick: Ring bell! (runs first, before timers/immediates)');
});

// Emit classEnd immediately (synchronous code runs first, before timers/nextTick callbacks)
schoolBell.emit('classEnd');

console.log('--- End of synchronous code ---');

/*
  Expected order of execution (typical):
  1. "--- School Bell System ---"
  2. classStart listener output (synchronous, runs immediately when emitted)
  3. classEnd listener output (synchronous, runs immediately when emitted)
  4. "--- End of synchronous code ---"
  5. process.nextTick callback   (runs first among the async ones - microtask, highest priority)
  6. setTimeout callback         (runs in the "timers" phase)
  7. setImmediate callback       (runs in the "check" phase, usually after setTimeout(0)
                                   in the main module, but order between setTimeout(0) and
                                   setImmediate can vary depending on the environment)

  Why process.nextTick runs first:
  - process.nextTick() callbacks are processed immediately after the current
    operation completes, before the event loop moves to its next phase.
  - setTimeout and setImmediate callbacks are queued for later event loop phases
    (timers phase and check phase respectively), so they always run after
    process.nextTick callbacks.
*/
