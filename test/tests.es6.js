QUnit.config.testTimeout = 3000;

itsalways.start();

var april = [2014, 3],
    april01 = [2014, 3, 1], // Tuesday
    april06 = [2014, 3, 6], // Sunday
    april11 = [2014, 3, 11], // Friday
    april12 = [2014, 3, 12], // Saturday
    april13 = [2014, 3, 13], // Sunday
    april14 = [2014, 3, 14], // Monday
    april15 = [2014, 3, 15], // Tuesday
    april16 = [2014, 3, 16], // Wednesday
    april17 = [2014, 3, 17], // Thursday
    april18 = [2014, 3, 18], // Friday
    april19 = [2014, 3, 19], // Saturday
    april20 = [2014, 3, 20], // Sunday
    april21 = [2014, 3, 21], // Monday

    april26 = [2014, 3, 26], // Saturday
    april27 = [2014, 3, 27], // Sunday
    may1 = [2014, 4, 1]; // Thursday

module('Resets');

QUnit.test('Next Daily reset', function(assert) {
  itsalways.UTC(...april15, 23);
  var expects = Date.UTC(...april16),
    actual = gw2reset.daily.next().getTime();
  assert.equal(actual, expects);

  itsalways.UTC(...april15, 0);
  expects = Date.UTC(...april16),
  actual = gw2reset.daily.next().getTime();
  assert.equal(actual, expects);
});

QUnit.test('Previous Daily reset', function(assert) {
  itsalways.UTC(...april15, 23);
  var expects = Date.UTC(...april15),
    actual = gw2reset.daily.previous().getTime();
  assert.equal(actual, expects);

  // if the time is exactly at reset time,
  // the present time is returned as "previous"
  itsalways.UTC(...april15, 0);
  expects = Date.UTC(...april15),
  actual = gw2reset.daily.previous().getTime();
  assert.equal(actual, expects);
});

test('Next NA WvW reset', function() {
  itsalways.UTC(...april15);
  var expects = Date.UTC(...april19, 1),
    actual = gw2reset.wvw.na.next().getTime();
  equal(actual, expects);

  itsalways.UTC(...april19, 0, 59, 59);
  actual = gw2reset.wvw.na.next().getTime();
  equal(actual, expects);

  expects = Date.UTC(...april26, 1),
  itsalways.UTC(...april19, 1);
  actual = gw2reset.wvw.na.next().getTime();
  equal(actual, expects);
});

test('Previous NA WvW reset', function() {
  itsalways.UTC(...april15);
  var expects = Date.UTC(...april12, 1),
    actual = gw2reset.wvw.na.previous().getTime();
  equal(actual, expects);

  // if the time is exactly at reset time,
  // the present time is returned as "previous"
  itsalways.UTC(...april12, 1);
  var expects = Date.UTC(...april12, 1),
    actual = gw2reset.wvw.na.previous().getTime();
  equal(actual, expects);
});

test('Next EU WvW reset', function() {
  itsalways.UTC(...april15);
  var expects = Date.UTC(...april18, 18),
    actual = gw2reset.wvw.eu.next().getTime();
  equal(actual, expects);
});

test('Previous EU WvW reset', function() {
  itsalways.UTC(...april15);
  var expects = Date.UTC(...april11, 18),
    actual = gw2reset.wvw.eu.previous().getTime();
  equal(actual, expects);

  // if the time is exactly at reset time,
  // the present time is returned as "previous"
  itsalways.UTC(...april11, 18);
  var expects = Date.UTC(...april11, 18),
    actual = gw2reset.wvw.eu.previous().getTime();
  equal(actual, expects);
});

QUnit.test('Next Guild reset', function(assert) {
  itsalways.UTC(...april15);
  var expects = Date.UTC(...april20),
    actual = gw2reset.guild.next().getTime();
  assert.equal(actual, expects);

  itsalways.UTC(...april13);
  expects = Date.UTC(...april20),
  actual = gw2reset.guild.next().getTime();
  assert.equal(actual, expects);
});

QUnit.test('Previous Guild reset', function(assert) {
  itsalways.UTC(...april15);
  var expects = Date.UTC(...april13),
    actual = gw2reset.guild.previous().getTime();
  assert.equal(actual, expects);

  // if the time is exactly at reset time,
  // the present time is returned as "previous"
  itsalways.UTC(...april13);
  expects = Date.UTC(...april13),
  actual = gw2reset.guild.previous().getTime();
  assert.equal(actual, expects);
});


QUnit.module('Internals');

test('getSaturdayAfter', function() {

  itsalways.stop();
  var actual;

  actual = getSaturdayAfter(new Date(...april12));
  equal(actual.getTime(), Date.UTC(...april, 19));

  actual = getSaturdayAfter(new Date(...april13));
  equal(actual.getTime(), Date.UTC(...april, 19));

  actual = getSaturdayAfter(new Date(...april14));
  equal(actual.getTime(), Date.UTC(...april, 19));

  actual = getSaturdayAfter(new Date(...april15));
  equal(actual.getTime(), Date.UTC(...april, 19));

  actual = getSaturdayAfter(new Date(...april16));
  equal(actual.getTime(), Date.UTC(...april, 19));

  actual = getSaturdayAfter(new Date(...april17));
  equal(actual.getTime(), Date.UTC(...april, 19));

  actual = getSaturdayAfter(new Date(...april18));
  equal(actual.getTime(), Date.UTC(...april, 19));

  actual = getSaturdayAfter(new Date(...april19));
  equal(actual.getTime(), Date.UTC(...april, 26));

  actual = getSaturdayAfter(new Date(...april20));
  equal(actual.getTime(), Date.UTC(...april, 26));
});

test('getSundayAfter', function() {

  itsalways.start();
  var actual;

  actual = getSundayAfter(new Date(...april12));
  equal(actual.getTime(), Date.UTC(...april13));

  actual = getSundayAfter(new Date(...april13));
  equal(actual.getTime(), Date.UTC(...april20));

  actual = getSundayAfter(new Date(...april14));
  equal(actual.getTime(), Date.UTC(...april20));

  actual = getSundayAfter(new Date(...april15));
  equal(actual.getTime(), Date.UTC(...april20));

  actual = getSundayAfter(new Date(...april16));
  equal(actual.getTime(), Date.UTC(...april20));

  actual = getSundayAfter(new Date(...april17));
  equal(actual.getTime(), Date.UTC(...april20));

  actual = getSundayAfter(new Date(...april18));
  equal(actual.getTime(), Date.UTC(...april20));

  actual = getSundayAfter(new Date(...april19));
  equal(actual.getTime(), Date.UTC(...april20));

  actual = getSundayAfter(new Date(...april20));
  equal(actual.getTime(), Date.UTC(...april27));
});

test('isSaturday', function() {
  var d;
  d = isSaturday(new Date(Date.UTC(...april12)));
  equal(d, true, 'Is a Saturday');

  d = isSaturday(new Date(Date.UTC(...april13)));
  equal(d, false, 'Is not a Saturday');

  d = isSaturday(new Date(Date.UTC(...april14)));
  equal(d, false, 'Is not a Saturday');

  d = isSaturday(new Date(Date.UTC(...april15)));
  equal(d, false, 'Is not a Saturday');

  d = isSaturday(new Date(Date.UTC(...april16)));
  equal(d, false, 'Is not a Saturday');

  d = isSaturday(new Date(Date.UTC(...april17)));
  equal(d, false, 'Is not a Saturday');

  d = isSaturday(new Date(Date.UTC(...april18)));
  equal(d, false, 'Is not a Saturday');

  d = isSaturday(new Date(Date.UTC(...april19)));
  equal(d, true, 'Is a Saturday');

  d = isSaturday(new Date(Date.UTC(...april20)));
  equal(d, false, 'Is not a Saturday');
});

test('isBeforeReset', function() {
  var d = new Date(Date.UTC(...april, 19));
  equal(isBeforeReset(d, 1), true, 'Is before 1:00 reset');
  equal(isBeforeReset(d, 18), true, 'Is before 18:00 reset');

  d = new Date(Date.UTC(...april, 19, 1));
  equal(isBeforeReset(d, 1), false, 'Is before 1:00 reset');
  equal(isBeforeReset(d, 18), true, 'Is before 18:00 reset');

  d = new Date(Date.UTC(...april, 19, 18));
  equal(isBeforeReset(d, 1), false, 'Is before 1:00 reset');
  equal(isBeforeReset(d, 18), false, 'Is before 18:00 reset');

});

QUnit.module('Events', {
  beforeEach: function () {
    gw2reset.daily.off();
    gw2reset.guild.off();
    gw2reset.wvw.na.off();
    gw2reset.wvw.eu.off();
  }
});

QUnit.test('on daily', function(assert) {

  var done = assert.async();

  assert.expect(1);

  itsalways.UTC(2014, 0, 31, 23, 59, 59);
  itsalways.start();

  gw2reset.daily.on(function () {
    assert.ok(true, 'on daily fired');
    done();
  });

  itsalways.UTC(2014, 1, 1, 0, 0, 1);
});

QUnit.test('on guild', function(assert) {

  var done = assert.async();

  assert.expect(1);

  itsalways.UTC(2014, 3, 19, 23, 59, 59);
  itsalways.start();

  gw2reset.guild.on(function () {
    assert.ok(true, 'on guild fired');
    done();
  });

  itsalways.UTC(2014, 3, 20, 0, 0, 1);
});

QUnit.test('on NA WvW', function(assert) {

  assert.expect(1);

  var done = assert.async();

  itsalways.UTC(2014, 3, 19, 0, 59, 59);
  itsalways.start();

  gw2reset.wvw.na.on(function () {
    assert.ok(true, 'on .wvw.na fired');
    done();
  });

  itsalways.UTC(2014, 3, 19, 1, 0, 1);
});

QUnit.test('on EU WvW', function(assert) {

  var done = assert.async();

  assert.expect(1);

  itsalways.UTC(2014, 3, 18, 17, 59, 59);
  itsalways.start();

  gw2reset.wvw.eu.on(function () {
    assert.ok(true, 'on .wvw.eu fired');
    done();
  });

  itsalways.UTC(2014, 3, 18, 18, 0, 1);
});


// Off methods are all created by the same factory function,
// there is no need to test more than one namespace
QUnit.test('off remove single handler', function(assert) {

  var done = assert.async();
  assert.expect(1);

  var handler1 = function () {
      assert.ok(false, 'handler 1 fired');
    },
    handler2 = function () {
      assert.ok(true, 'handler 2 fired');
      done();
    }

  itsalways.UTC(2014, 0, 31, 23, 59, 59);
  itsalways.start();

  gw2reset.daily.on(handler1);
  gw2reset.daily.on(handler2);
  gw2reset.daily.off(handler1);

  itsalways.UTC(2014, 1, 1, 0, 0, 1);
});

QUnit.test('off remove all handlers', function(assert) {

  var done = assert.async();

  gw2reset.daily.off();
  assert.expect(0);

  var handler1 = function () {
      assert.ok(false, 'handler 1 fired');
    },
    handler2 = function () {
      assert.ok(false, 'handler 2 fired');
    }

  itsalways.UTC(2014, 0, 31, 23, 59, 59);
  itsalways.start();

  gw2reset.daily.on(handler1);
  gw2reset.daily.on(handler2);
  gw2reset.daily.off();

  itsalways.UTC(2014, 1, 1, 0, 0, 1);

  setTimeout(function () {
    done();
  }, 2050);

});
