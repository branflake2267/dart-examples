function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_lib0_value", "_isComplete"],
 super: "Object",
 _setException$2: function(exception, stackTrace) {
  if (exception == null)
    throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
},
 _setValue$1: function(value) {
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib0_value = value;
  this._complete$0();
},
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null))
      for (var t1 = $.iterator(this._exceptionHandlers); t1 .hasNext$0() === true;) {
        var handler = t1 .next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1 .hasNext$0() === true;) {
        var listener = t1 .next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  }  finally {
    for (t1 = $.iterator(this._completionListeners); t1 .hasNext$0() === true;) {
      var listener0 = t1 .next$0();
      try {
        listener0 .call$1(this);
      }  catch (exception) {
        $.unwrapException(exception);
      }

    }
  }
},
 handleException$1: function(onException) {
  if (this._exceptionHandled === true)
    return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null))
      this._exceptionHandled = onException.call$1(t1);
  } else
    $.add$1(this._exceptionHandlers, onException);
},
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true)
    onSuccess.call$1(this.get$value());
  else if (this.get$isComplete() !== true)
    $.add$1(this._successListeners, onSuccess);
  else if (this._exceptionHandled !== true)
    throw $.captureStackTrace(this._exception);
},
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
},
 get$isComplete: function() {
  return this._isComplete;
},
 get$stackTrace: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
},
 get$value: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null))
    throw $.captureStackTrace(t1);
  return this._lib0_value;
}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
},
 get$future: function() {
  return this._futureImpl;
}
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 getValues$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'V'})));
  t1 .i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'K'})));
  t1 .i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC4))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  ;
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC4))
      f.call$2(key, $.index(this._values, i));
  }
},
 get$length: function() {
  return this._numberOfEntries;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC4);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  var t3 = t1 .length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
      return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t3 = t1 .length;
    if (index < 0 || index >= t3)
      throw $.ioore(index);
    var t4 = t1[index] === $.CTC4;
    t1 = t4;
  } else
    t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number')
      return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t3 = t1 .length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  var t5 = t1 .length;
  if (index < 0 || index >= t5)
    throw $.ioore(index);
  t1[index] = value;
},
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !($.index(t1, index) == null))
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC4;
            t1 = t3;
        }
      else
        t1 = true;
    case 3:
      if (state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  ;
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, (({E: 'V'})));
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC4)
      continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, (({E: 'V'})));
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC4)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0))
    return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(2, key, hash, numberOfProbes, insertionIndex, t1);
    var t3 = t1 .length;
    if (hash < 0 || hash >= t3)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC4 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              var t1 = this._keys;
            case 2:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC4 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 3:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, (({E: 'V'})));
  this._values = t1;
},
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  return t1;
},
 get$length: function() {
  return $.get$length(this._backingMap);
},
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
},
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
},
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1 .containsKey$1(value) !== true)
    return false;
  t1 .remove$1(value);
  return true;
},
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
},
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0))
    throw $.iae(value);
  var t3 = t1 .length;
  if (value < 0 || value >= t3)
    throw $.ioore(value);
  t1[value] = value;
},
 add$1$bailout: function(state, t1, value) {
  ;
  $.indexSet(t1, value, value);
},
 clear$0: function() {
  $.clear(this._backingMap);
},
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
},
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this._advance$0$bailout(1, t1);
  var length$ = t1 .length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$)
      break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    var t3 = t1 .length;
    if (t2 < 0 || t2 >= t3)
      throw $.ioore(t2);
    entry = t1[t2];
  } while (entry == null || entry === $.CTC4);
},
 _advance$0$bailout: function(state, t1) {
  ;
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$))
      break;
    entry = $.index(t1, this._nextValidIndex);
  } while (entry == null || entry === $.CTC4);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t4 = t1 .length;
  if (t3 < 0 || t3 >= t4)
    throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
},
 next$0$bailout: function(state, t1) {
  ;
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
},
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2 .constructor !== Array && !t2 .is$JavaScriptIndexingBehavior()))
    return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2 .length;
  if (t1 >= t4)
    return false;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  if (t1 < 0 || t1 >= t4)
    throw $.ioore(t1);
  if (t2[t1] === $.CTC4)
    this._advance$0();
  return this._nextValidIndex < t2 .length;
},
 hasNext$0$bailout: function(state, t1, t2) {
  ;
  if ($.geB(t1, $.get$length(t2)))
    return false;
  if ($.index(t2, this._nextValidIndex) === $.CTC4)
    this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
},
 HashSetIterator$1: function(set_) {
  this._advance$0();
}
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 get$length: function() {
  return $.get$length(this._map);
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
},
 getValues$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'V'})));
  t1 .index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = (({}));
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, (({E: 'K'})));
  t1 .index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1 .constructor !== Array || !!t1 .immutable$list) && !t1 .is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1 .containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    var t2 = t1 .length;
    if (key < 0 || key >= t2)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2 .lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    var t3 = t1 .length;
    if (key < 0 || key >= t3)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  ;
  if (t1 .containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2 .lastEntry$0());
  }
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, (({E: 'KeyValuePair<K, V>'})));
  this._list = t1;
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  t1 ._link$2(this._previous, this);
},
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC6);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 remove$0: function() {
  throw $.captureStackTrace($.CTC6);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  return t1;
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1 .get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1 .set$_next(t1);
  t1 .set$_previous(t1);
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1 .get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 get$length: function() {
  var t1 = (({}));
  t1 .counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1 .counter_1;
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, (({E: 'E'})));
  this._sentinel = t1;
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, (({E: 'String'})));
  this._buffer = t1;
  this._length = 0;
  return this;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 isEmpty$0: function() {
  return this._length === 0;
},
 get$length: function() {
  return this._length;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
},
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null)
    return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
},
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
},
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
},
 group$1: function(index) {
  return $.index(this._groups, index);
}
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
}
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true)
    return false;
  else if (!(this._next == null))
    return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  } else
    return true;
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
}
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = ((this.list[this.i]));
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  ;
  this.i = $.add(t1, 1);
  return value;
},
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < ((this.list.length));
},
 hasNext$0$bailout: function(state, t1) {
  ;
  return $.lt(t1, ((this.list.length)));
}
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib1_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
},
 operator$index$1: function(g) {
  return this.group$1(g);
}
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1 .length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    var t2 = t1 .length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1 .length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    t2 = t1 .length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
},
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
},
 is$Exception: true
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
},
 is$Exception: true
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 clear$0: function() {
  this._this.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 last$0: function() {
return this._this.lastChild;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1 .constructor !== Array && !t1 .is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t5 = t1 .length;
  if (t3 < 0 || t3 >= t5)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC1);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
},
 reset$0: function() {
},
 operator$indexSet$2: function(object, info) {
},
 operator$index$1: function(object) {
  return;
}
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true)
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
},
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true)
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1 .reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  }  finally {
    t1 .cleanup$0();
  }
  return result;
}
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = (({}));
  var t2 = this._visited;
  t1 .copy_1 = $.index(t2, map);
  var t3 = t1 .copy_1;
  if (!(t3 == null))
    return t3;
  t1 .copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1 .copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1 .copy_1;
},
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1 .operator$index$1(list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1 .operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
},
 visitList$1$bailout: function(state, list) {
  ;
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitPrimitive$1: function(x) {
  return x;
}
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    result[i] = t2;
  }
  return result;
},
 _serializeList$1$bailout: function(state, list) {
  ;
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
},
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
},
 visitPrimitive$1: function(x) {
  return x;
}
};

$$._Deserializer = {"":
 [],
 super: "Object",
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    var t1 = keys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t2 = values.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
},
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i)
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      return result;
  }
},
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || (dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())
    return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    var t1 = dartList.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._deserializeHelper$1(dartList[i]);
    var t3 = dartList.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    dartList[i] = t2;
  }
  return dartList;
},
 _deserializeList$1$bailout: function(state, dartList, id) {
  ;
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i)
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  return dartList;
},
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
},
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true)
    return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      throw $.captureStackTrace('Unexpected serialized object');
  }
},
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true)
    return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
}
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true)
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
},
 _nativeInitWorkerMessageHandler$0: function() {
    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  
},
 _nativeDetectEnvironment$0: function() {
    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  
},
 get$needSerialization: function() {
  return this.get$useWorkers();
},
 get$useWorkers: function() {
  return this.supportsWorkers;
},
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
}
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1 .remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState().get$isolates().remove$1(this.id);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1 .containsKey$1(portId) === true)
    throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
},
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
},
 _setGlobals$0: function() {
$setGlobals(this);
},
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.call$0();
  }  finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1 ._setGlobals$0();
  }
  return result;
},
 initGlobals$0: function() {
$initGlobals(this);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1 .get$nextIsolateId();
  t1 .set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
}
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true)
    this._runHelper$0();
  else
    try {
      this._runHelper$0();
    }  catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }

},
 _runHelper$0: function() {
  if (!($._window() == null))
    new $._EventLoop__runHelper_next(this).call$0();
  else
    for (; this.runIteration$0() === true;)
      ;
},
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true)
      $._globalState().maybeCloseWorker$0();
    else if (!($._globalState().get$rootContext() == null) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true)
      throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    return false;
  }
  event$.process$0();
  return true;
},
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true)
    return;
  return t1 .removeFirst$0();
},
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
}
};

$$._IsolateEvent = {"":
 ["message", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
}
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
$globalThis.postMessage(msg);
},
 get$id: function() {
  return 0;
}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null))
    return this.visitSendPort$1(port.get$_port());
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
},
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
},
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null))
    return this.visitSendPort$1(port.get$_port());
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
},
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
},
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null)
      return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  } else
    return $._WorkerSendPort$(managerId, isolateId, receivePortId);
}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
return o['__MessageTraverser__attached_info__'];
},
 _setAttachedInfo$2: function(o, info) {
o['__MessageTraverser__attached_info__'] = info;
},
 _clearAttachedInfo$1: function(o) {
o['__MessageTraverser__attached_info__'] = (void 0);
},
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number')
    return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 cleanup$0$bailout: function(state, length$) {
  ;
  var i = 0;
  for (; $.ltB(i, length$); ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
},
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
},
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
},
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_NativeJsSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_WorkerSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_BufferingSendPort))
    throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
},
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(this, message, replyTo));
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort)
    var t1 = $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId);
  else
    t1 = false;
  return t1;
},
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(this, message, replyTo));
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_callback?", "_id?"],
 super: "Object",
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState().get$currentContext().get$id());
},
 close$0: function() {
  this._callback = null;
  $._globalState().get$currentContext().unregister$1(this._id);
},
 receive$1: function(onMessage) {
  this._callback = onMessage;
},
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._id, this);
}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitSendPort$1: function(port) {
  if (typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort && port.get$_port() == null)
    $.add$1(this.ports, port.get$_futurePort());
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null))
    return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
},
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null))
    return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
},
 visitPrimitive$1: function(x) {
},
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._Timer = {"":
 ["_handle", "_once"],
 super: "Object",
 _Timer$repeating$2: function(milliSeconds, callback) {
  this._handle = $._window().setInterval$2(new $.anon0(this, callback), milliSeconds);
},
 _Timer$2: function(milliSeconds, callback) {
  this._handle = $._window().setTimeout$2(new $.anon(this, callback), milliSeconds);
}
};

$$.main_anon = {"":
 [],
 super: "Closure",
 call$1: function(time) {
  return $.drawCircle2(time);
}
};

$$.main_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(time) {
  return $.drawRect(time);
}
};

$$.main_anon1 = {"":
 [],
 super: "Closure",
 call$1: function(time) {
  return $.drawText(time);
}
};

$$.main_anon2 = {"":
 [],
 super: "Closure",
 call$1: function(time) {
  return $.drawBezierCurve(time);
}
};

$$.main_anon3 = {"":
 [],
 super: "Closure",
 call$1: function(time) {
  return $.drawQuadraticCurve(time);
}
};

$$.main_anon4 = {"":
 [],
 super: "Closure",
 call$1: function(time) {
  return $.drawPath(time);
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 call$0: function() {
  return this.closure_0 .call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 call$0: function() {
  return this.closure_2 .call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 call$0: function() {
  return this.closure_5 .call$2(this.arg1_4, this.arg2_3);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 call$2: function(k, v) {
  if (this.box_0 .first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0 .first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.drawCircle1_anon = {"":
 [],
 super: "Closure",
 call$1: function(time) {
  $.context.beginPath$0();
  $.context.arc$6(75, 75, 30, 0, 6.283185307179586, true);
  $.context.stroke$0();
}
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.f_0 .call$1(key);
}
};

$$.startRootIsolate_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  return $._setTimerFactoryClosure($._timerFactory);
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0 .counter_1, 1);
  this.box_0 .counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(entry) {
  this.f_0 .call$2(entry.get$key(), entry.get$value());
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1 .close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2 .completeException$1(value);
  else
    t2 .complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["this_2", "message_1", "replyTo_0"],
 super: "Closure",
 call$0: function() {
  this.this_2 ._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_2, 'msg', this.message_1, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true)
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState().get$managers(), this.this_2 .get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(_) {
  return this.callback_0 .call$0();
}
};

$$.Futures_wait_anon = {"":
 ["completer_5", "pos_4", "box_0", "result_3", "values_2"],
 super: "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0 .remaining_1, 1);
  this.box_0 .remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_3 .get$isComplete() !== true)
    this.completer_5 .complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["future_8", "completer_7", "result_6"],
 super: "Closure",
 call$1: function(exception) {
  if (this.result_6 .get$isComplete() !== true)
    this.completer_7 .completeException$2(exception, this.future_8 .get$stackTrace());
  return true;
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0 ._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0 ._dispatch$1(e);
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0 .i_1;
  var i = $.add(t2, 1);
  this.box_0 .i_1 = i;
  $.indexSet(t1, t2, value);
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0 .index_1;
  var index = $.add(t2, 1);
  this.box_0 .index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["this_5", "message_4", "replyTo_3"],
 super: "Closure",
 call$0: function() {
  var t1 = (({}));
  this.this_5 ._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_5 .get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_5 .get$_receivePort().get$_callback() == null)
    return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_5 .get$_isolateId());
  t1 .msg_1 = this.message_4;
  t1 .reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1 .msg_1 = $._serializeMessage(t1 .msg_1);
    t1 .reply_2 = $._serializeMessage(t1 .reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_5, t1, shouldSerialize), 'receive ' + $.S(this.message_4));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 call$0: function() {
  if (!(this.this_7 .get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0 .msg_1);
      this.box_0 .msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0 .reply_2);
      this.box_0 .reply_2 = reply;
    }
    var t1 = this.this_7 .get$_receivePort();
    var t2 = this.box_0;
    t1 ._callback$2(t2 .msg_1, t2 .reply_2);
  }
}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0 .i_1;
  var i = $.add(t2, 1);
  this.box_0 .i_1 = i;
  $.indexSet(t1, t2, key);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0 .index_1;
  var index = $.add(t2, 1);
  this.box_0 .index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0 .copy_1, this.this_2 ._dispatch$1(key), this.this_2 ._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  if (this.this_0 .runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0 .call$1(this.this_1);
}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0 .call$1(this.this_1);
}
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a > b);
  return a.operator$gt$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length))
    return false;
  return (other == (receiver.substring(0, length$)));
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.eqB = function(a, b) {
  if ((a == null))
    return (b == null);
  if ((b == null))
    return false;
  if ((typeof a === "object"))
    if ((!!a.operator$eq$1))
      return a.operator$eq$1(b) === true;
  return (a === b);
};

$.typeNameInChrome = function(obj) {
  var name$ = ((obj.constructor.name));
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    (receiver.length = newLength);
  } else
    receiver.set$length(newLength);
  return newLength;
};

$._document = function() {
return document;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = ((closure.$identity));
  if ((!!function$))
    return function$;
  function$ = ((function() {
    return ($.invokeClosure.call$5)(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  }));
  (closure.$identity = function$);
  return function$;
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.isJsArray = function(value) {
  return !(value == null) && ((value.constructor === Array));
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true)
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (((String(object.constructor)).match(/^\s*function\s*(\S*)\s*\(/)[1]));
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1 .HashSetIterator$1(set_);
  return t1;
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      t1 = array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.drawCircle2 = function(time) {
  $.context.beginPath$0();
  $.context.arc$6(30, 50, 30, 0, 6.283185307179586, true);
  $.context.stroke$0();
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true)
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true)
    return (receiver.length === 0);
  return receiver.isEmpty$0();
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1 .hasNext$0() === true;)
    f.call$1(t1 .next$0());
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))
    return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, (({E: 'String'})));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))
      return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1)
        throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.drawCircle1 = function() {
  return new $.drawCircle1_anon();
};

$.constructorNameFallback = function(obj) {
  var constructor$ = ((obj.constructor));
  if (((typeof(constructor$))) === 'function') {
    var name$ = ((constructor$.name));
    if (((typeof(name$))) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object') && !(name$ === 'Function.prototype'))
      return name$;
  }
  var string = ((Object.prototype.toString.call(obj)));
  return $.substring$2(string, 8, string.length - 1);
};

$.dynamicFunction = function(name$) {
  var f = ((Object.prototype[name$]));
  if (!(f == null) && ((!!f.methods)))
    return (f.methods);
  var methods = (({}));
  var dartMethod = ((Object.getPrototypeOf($.CTC5)[name$]));
  if (!(dartMethod == null))
    (methods['Object'] = dartMethod);
  var bind = ((function() {return ($.dynamicBind.call$4)(this, name$, methods, Array.prototype.slice.call(arguments));}));
  (bind.methods = methods);
  $.defineProperty(((Object.prototype)), name$, bind);
  return methods;
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, false);
  t1 ._Timer$repeating$2(milliSeconds, callback);
  return t1;
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a < b)) : $.lt$slow(a, b) === true;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return $.truncate(((a)) / ((b)));
  return a.operator$tdiv$1(b);
};

$.unwrapException = function(ex) {
  if (("dartException" in ex))
    return (ex.dartException);
  var message = ((ex.message));
  if ((ex instanceof TypeError)) {
    var type = ((ex.type));
    var name$ = ((ex.arguments ? ex.arguments[0] : ""));
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC);
      else if ($.endsWith(message, 'is not a function') === true)
        return $.NoSuchMethodException$('', '<unknown>', [], null);
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if ((ex instanceof RangeError)) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if ((typeof InternalError == 'function' && ex instanceof InternalError))
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = ((new Error()));
  (jsError.dartException = ex);
  (jsError.toString = ($.toStringWrapper.call$0));
  return jsError;
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(null, t1);
  t1 ._ReceivePortImpl$0();
  return t1;
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a >= b);
  return a.operator$ge$1(b);
};

$.stringJoinUnchecked = function(array, separator) {
  return (array.join(separator));
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return (Math.floor(receiver));
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.getFunctionForTypeNameOf = function() {
  if (!(((typeof(navigator))) === 'object'))
    return $.typeNameInChrome;
  var userAgent = ((navigator.userAgent));
  if ($.contains$1(userAgent, $.CTC3) === true)
    return $.typeNameInChrome;
  else if ($.contains$1(userAgent, 'Firefox') === true)
    return $.typeNameInFirefox;
  else if ($.contains$1(userAgent, 'MSIE') === true)
    return $.typeNameInIE;
  else if ($.contains$1(userAgent, 'Opera') === true)
    return $.typeNameInOpera;
  else if ($.contains$1(userAgent, 'Safari') === true)
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1 ._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = ((a));
    b = ((b));
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return (a >>> b);
    }
    if (b > 31)
      b = 31;
    return ((a >> b) >>> 0);
  }
  return a.operator$shr$1(b);
};

$.drawText = function(time) {
  $.context.strokeText$4('c.dart-examples.com', 120, 120, $.width);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    (a[index] = value);
    return;
  }
  a.operator$indexSet$2(index, value);
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1 ._JsCopier$0();
  return t1;
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return ((a & b) >>> 0);
  return a.operator$and$1(b);
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    (target.builtin$typeInfo = typeInfo);
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a * b);
  return a.operator$mul$1(b);
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return (receiver & 0x1FFFFFFF);
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = ((receiver.length));
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + ((receiver.charCodeAt(i)));
    var hash1 = 536870911 & hash0 + ((524287 & hash0 << 10));
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + ((67108863 & hash << 3));
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + ((16383 & hash0 << 15));
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$._setTimerFactoryClosure = function(closure) {
  $._TimerFactory__factory = closure;
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a > b)) : $.gt$slow(a, b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true)
    return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  if (!($._window() == null))
    rootContext.eval$1(new $.startRootIsolate_anon());
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string')
    return (receiver.split(pattern));
  else if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp)
    return (receiver.split($.regExpGetNative(pattern)));
  else
    throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a < b);
  return a.operator$lt$1(b);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number'))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return (receiver.charCodeAt(index));
  } else
    return receiver.charCodeAt$1(index);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o) === true)
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o) === true)
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1 ._IsolateContext$0();
  return t1;
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  if (typeof startIndex !== 'number')
    return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a * b)) : $.mul$slow(a, b);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, (({E: '_IsolateEvent'})));
  return new $._EventLoop(t1);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return (receiver.substring(startIndex, endIndex));
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    (receiver.push(value));
    return;
  }
  return receiver.add$1(value);
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, true);
  t1 ._Timer$2(milliSeconds, callback);
  return t1;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true)
    return (receiver.length);
  else
    return receiver.get$length();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = ((methods[tag]));
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = ((methods[entry.get$tag()]));
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = ((methods['Object']));
  var proto = ((Object.getPrototypeOf(obj)));
  if (method == null)
    method = ((function () {if (Object.getPrototypeOf(this) === proto) {($.throwNoSuchMethod.call$3)(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}}));
  if ((!proto.hasOwnProperty(name$)))
    $.defineProperty(proto, name$, method);
  return (method.apply(obj, arguments$));
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'CanvasPixelArray'))
    return 'Uint8ClampedArray';
  if ($.eqB(name$, 'WebKitMutationObserver'))
    return 'MutationObserver';
  return name$;
};

$.regExpExec = function(regExp, str) {
  var result = (($.regExpGetNative(regExp).exec(str)));
  if ((result === null))
    return;
  return result;
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength))
    return false;
  if (typeof otherLength !== 'number')
    throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global === true)
    $.add$1(sb, 'g');
  try {
    return (new RegExp(pattern, $.toString(sb)));
  }  catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, ((String(e)))));
  }

};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.regExpMatchStart = function(m) {
  return (m.index);
};

$.toString = function(value) {
  if ((typeof value == "object" && value !== null))
    if ($.isJsArray(value) === true)
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if ((value === 0 && (1 / value) < 0))
    return '-0.0';
  if (value == null)
    return 'null';
  if ((typeof value == "function"))
    return 'Closure';
  return (String(value));
};

$.drawBezierCurve = function(time) {
  $.context.beginPath$0();
  $.context.bezierCurveTo$6(5, 20, 50, 75, 150, 75);
  $.context.stroke$0();
};

$.main = function() {
  var canvas = $._Elements_CanvasElement($.width, $.height);
  $.add$1($.query('#canvas').get$nodes(), canvas);
  $.context = canvas.getContext$1('2d');
  $.context.clearRect$4(0, 0, $.width, $.height);
  $.window().requestAnimationFrame$1($.drawCircle1());
  $.window().requestAnimationFrame$1(new $.main_anon());
  $.window().requestAnimationFrame$1(new $.main_anon0());
  $.window().requestAnimationFrame$1(new $.main_anon1());
  $.window().requestAnimationFrame$1(new $.main_anon2());
  $.window().requestAnimationFrame$1(new $.main_anon3());
  $.window().requestAnimationFrame$1(new $.main_anon4());
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true)
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.ceil$0();
  return (Math.ceil(receiver));
};

$._dynamicMetadata = function(table) {
  ($dynamicMetadata = table);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, (({E: 'Match'})));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0))
    return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$._dynamicMetadata0 = function() {
  if (((typeof($dynamicMetadata))) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return ($dynamicMetadata);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a + b);
  return a.operator$add$1(b);
};

$.drawQuadraticCurve = function(time) {
  $.context.beginPath$0();
  $.context.quadraticCurveTo$4(10, 10, 150, 150);
  $.context.stroke$0();
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1 ._PendingSendPortFinder$0();
  return t1;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return (receiver.pop());
  }
  return receiver.removeLast$0();
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  else if ($.eqB(numberOfArguments, 1))
    return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  else if ($.eqB(numberOfArguments, 2))
    return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.Futures_wait = function(futures) {
  var t1 = (({}));
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, (({T: 'List'})));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, (({T: 'List'})));
  var result = completer.get$future();
  t1 .remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
  var t2;
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.indexSet = function(a, index, value) {
  if ((a.constructor === Array && !a.immutable$list)) {
    var key = ((index >>> 0));
    if (key === index && key < ((a.length))) {
      (a[key] = value);
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true)
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  (receiver.push(value));
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return (a[index]);
  }
  return a.operator$index$1(index);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1 .hasNext$0() === true;) {
    var t2 = t1 .next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$._Elements_CanvasElement = function(width, height) {
  var _e = $._document().$dom_createElement$1('canvas');
  if (!(width == null))
    _e.set$width(width);
  if (!(height == null))
    _e.set$height(height);
  return _e;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a + b)) : $.add$slow(a, b);
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a >= b)) : $.ge$slow(a, b) === true;
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.drawRect = function(time) {
  $.context.strokeRect$5(20, 30, 50, 70, 3);
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(((exception.stack)));
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.regExpAttachGlobalNative = function(regExp) {
  (regExp._re = $.regExpMakeNative(regExp, true));
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = (({}));
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1 .first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document'))
    return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument'))
    return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent'))
    return 'MessageEvent';
  return name$;
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return (a - b);
  return a.operator$sub$1(b);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, ((receiver.length)));
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return (receiver.indexOf(element, start));
  }
  return receiver.indexOf$2(element, start);
};

$.checkMutable = function(list, reason) {
  if ((!!(list.immutable$list)))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.checkGrowable = function(list, reason) {
  if ((!!(list.fixed$length)))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if ((!!obj.xmlVersion))
      return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'CanvasPixelArray'))
    return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLDDElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'HTMLDTElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'HTMLTableDataCellElement'))
    return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement'))
    return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLPhraseElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'MSStyleCSSProperties'))
    return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'MouseWheelEvent'))
    return 'WheelEvent';
  return name$;
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1 .HashSetImplementation$0();
  return t1;
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return (new Array());
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = ((new Array(length$)));
  (result.fixed$length = true);
  return result;
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1 .DoubleLinkedQueue$0();
  return t1;
};

$._globalState = function() {
return $globalState;
};

$.index = function(a, index) {
  if ((typeof a == "string" || a.constructor === Array)) {
    var key = ((index >>> 0));
    if (key === index && key < ((a.length)))
      return (a[key]);
  }
  return $.index$slow(a, index);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$._globalState0 = function(val) {
$globalState = val;
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1 .StringBufferImpl$1(content$);
  return t1;
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.window = function() {
return window;
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  return name$;
};

$._window = function() {
  return ((typeof window != "undefined")) ? ((window)) : null;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true)
    return ((a ^ b) >>> 0);
  return a.operator$xor$1(b);
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1 .HashMapImplementation$0();
  return t1;
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1 .JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1 ._JsSerializer$0();
  return t1;
};

$.eq = function(a, b) {
  if ((a == null))
    return (b == null);
  if ((b == null))
    return false;
  if ((typeof a === "object"))
    if ((!!a.operator$eq$1))
      return a.operator$eq$1(b);
  return (a === b);
};

$.regExpTest = function(regExp, str) {
  return ($.regExpGetNative(regExp).test(str));
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1 .LinkedHashMapImplementation$0();
  return t1;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1 .DoubleLinkedQueueEntry$1(null);
  t1 ._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$.toStringWrapper = function() {
  return $.toString(((this.dartException)));
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a > b)) : $.gt$slow(a, b) === true;
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.defineProperty = function(obj, property, value) {
  (Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true}));
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = ((a));
    b = ((b));
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return ((a << b) >>> 0);
  }
  return a.operator$shl$1(b);
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a < b)) : $.lt$slow(a, b);
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1 ._Manager$0();
  return t1;
};

$.regExpGetNative = function(regExp) {
  var r = ((regExp._re));
  return r == null ? ((regExp._re = $.regExpMakeNative(regExp, false))) : r;
};

$.drawPath = function(time) {
  $.context.beginPath$0();
  $.context.moveTo$2(70, 70);
  $.context.moveTo$2(80, 80);
  $.context.stroke$0();
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? ((a - b)) : $.sub$slow(a, b);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1 .DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a)))
        return -1;
      if ($.ltB(startIndex, 0))
        startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
        if ($.eqB($.index(a, i), element))
          return i;
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a)))
        return -1;
      if ($.ltB(startIndex, 0))
        startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
        if ($.eqB($.index(a, i), element))
          return i;
      return -1;
  }
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  ;
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, $.get$length(inputTable)))
                break L0;
              var tag = $.index($.index(inputTable, i), 0);
              var tags = $.index($.index(inputTable, i), 1);
              var set = $.HashSetImplementation$();
              $.setRuntimeTypeInfo(set, (({E: 'String'})));
              var tagNames = $.split(tags, '|');
            case 2:
              state = 0;
              for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j)
                set.add$1($.index(tagNames, j));
              $.add$1(result, $.MetaInfo$(tag, tags, set));
              ++i;
          }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  ;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$.Futures_wait$bailout = function(state, futures, t1) {
  ;
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, (({T: 'List'})));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, (({T: 'List'})));
  var result = completer.get$future();
  t1 .remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
};

$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.throwNoSuchMethod.call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC5 = new Isolate.$isolateProperties.Object();
$.CTC3 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC4 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC2 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC6 = new Isolate.$isolateProperties.EmptyQueueException();
$._ReceivePortImpl__nextFreeId = 1;
$._TimerFactory__factory = null;
$.height = 500;
$.context = null;
$.width = 500;
$._getTypeNameOf = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$List: function() { return false; },
 is$Map: function() { return false; },
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$Collection: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); }
});

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width!", "height!"], {
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); }
});

$.$defineNativeClass('HTMLButtonElement', ["value="], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$width: function(value) {
  this.setProperty$3('width', value, '');
},
 set$height: function(value) {
  this.setProperty$3('height', value, '');
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return (this.setProperty(propertyName,value,priority));
},
 getPropertyValue$1: function(propertyName) {
  return (this.getPropertyValue(propertyName));
}
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width!", "height!"], {
 getContext$1: function(contextId) {
  return (this.getContext(contextId));
}
});

$.$defineNativeClass('CanvasRenderingContext2D', [], {
 strokeText$4: function(text, x, y, maxWidth) {
  return (this.strokeText(text,x,y,maxWidth));
},
 strokeRect$5: function(x, y, width, height, lineWidth) {
  return (this.strokeRect(x,y,width,height,lineWidth));
},
 stroke$0: function() {
  return (this.stroke());
},
 quadraticCurveTo$4: function(cpx, cpy, x, y) {
  return (this.quadraticCurveTo(cpx,cpy,x,y));
},
 moveTo$2: function(x, y) {
  return (this.moveTo(x,y));
},
 clearRect$4: function(x, y, width, height) {
  return (this.clearRect(x,y,width,height));
},
 bezierCurveTo$6: function(cp1x, cp1y, cp2x, cp2y, x, y) {
  return (this.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y));
},
 beginPath$0: function() {
  return (this.beginPath());
},
 arc$6: function(x, y, radius, startAngle, endAngle, anticlockwise) {
  return (this.arc(x,y,radius,startAngle,endAngle,anticlockwise));
}
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return (this.contains(string));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'String'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return (this.toString());
},
 remove$1: function(token) {
  return (this.remove(token));
},
 contains$1: function(token) {
  return (this.contains(token));
},
 add$1: function(token) {
  return (this.add(token));
}
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return (this.clear());
},
 add$2: function(data_OR_file, type) {
  return (this.add(data_OR_file,type));
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDocument', [], {
 query$1: function(selectors) {
  if ($.CTC2 .hasMatch$1(selectors) === true)
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
},
 $dom_querySelector$1: function(selectors) {
  return (this.querySelector(selectors));
},
 $dom_getElementById$1: function(elementId) {
  return (this.getElementById(elementId));
},
 $dom_createElement$1: function(tagName) {
  return (this.createElement(tagName));
}
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return (this.querySelector(selectors));
},
 get$parent: function() {
  return;
},
 get$id: function() {
  return '';
},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
}
});

$.$defineNativeClass('Element', ["id?"], {
 $dom_querySelector$1: function(selectors) {
  return (this.querySelector(selectors));
},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
}
});

$.$defineNativeClass('HTMLEmbedElement', ["width!", "height!"], {
});

$.$defineNativeClass('Entry', [], {
 remove$2: function(successCallback, errorCallback) {
  return (this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1)));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
},
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return (this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1)));
},
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return (this.remove());
},
 moveTo$2: function(parent, name) {
  return (this.moveTo(parent,name));
}
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('EventSource', [], {
 close$0: function() {
  return (this.close());
}
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('FileList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'File'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["length?"], {
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'num'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'num'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return (this.reset());
}
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["width!"], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return (this.remove(index));
},
 set$length: function(value) {
this.length = value;
},
 get$length: function() {
return this.length;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 close$0: function() {
  return (this.close());
}
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return (this.clear());
},
 add$2: function(value, key) {
  return (this.add(value,key));
},
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLImageElement', ["width!", "height!"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["width!", "value=", "pattern?", "height!"], {
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('HTMLMarqueeElement', ["width!", "height!"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'String'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 remove$1: function(track) {
  return (this.remove(track));
},
 add$1: function(track) {
  return (this.add(track));
}
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return (this.close());
}
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return (this.replaceChild(newChild,oldChild));
},
 $dom_removeChild$1: function(oldChild) {
  return (this.removeChild(oldChild));
},
 contains$1: function(other) {
  return (this.contains(other));
},
 $dom_appendChild$1: function(newChild) {
  return (this.appendChild(newChild));
},
 set$text: function(value) {
this.textContent = value;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
}
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 clear$0: function() {
  this._parent.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Node'})));
  return t1;
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 close$0: function() {
  return (this.close());
}
});

$.$defineNativeClass('HTMLObjectElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value="], {
});

$.$defineNativeClass('HTMLParamElement', ["value="], {
});

$.$defineNativeClass('PeerConnection00', [], {
 close$0: function() {
  return (this.close());
}
});

$.$defineNativeClass('HTMLPreElement', ["width!"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
return this.id;
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGRect', ["width!", "height!"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return (this.clear());
}
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "length="], {
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return (this.setItem(key,data));
},
 $dom_removeItem$1: function(key) {
  return (this.removeItem(key));
},
 $dom_key$1: function(index) {
  return (this.key(index));
},
 $dom_getItem$1: function(key) {
  return (this.getItem(key));
},
 $dom_clear$0: function() {
  return (this.clear());
},
 get$$$dom_length: function() {
return this.length;
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$length: function() {
  return this.get$$$dom_length();
},
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
},
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'StyleSheet'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLTableColElement', ["width!"], {
});

$.$defineNativeClass('HTMLTableElement', ["width!"], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value="], {
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'Touch'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, (({T: 'int'})));
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width!", "height!"], {
});

$.$defineNativeClass('WebSocket', [], {
 close$2: function(code, reason) {
  return (this.close(code,reason));
},
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('DOMWindow', ["length?"], {
 setTimeout$2: function(handler, timeout) {
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
},
 setInterval$2: function(handler, timeout) {
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 moveTo$2: function(x, y) {
  return (this.moveTo(x,y));
},
 close$0: function() {
  return (this.close());
},
 _ensureRequestAnimationFrame$0: function() {
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }

},
 _requestAnimationFrame$1: function(callback) {
  return (this.requestAnimationFrame($.convertDartClosureToJS(callback, 1)));
},
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return (this.postMessage(message,messagePorts));
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', [], {
 setTimeout$2: function(handler, timeout) {
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
},
 setInterval$2: function(handler, timeout) {
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 close$0: function() {
  return (this.close());
}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return (this.toString());
}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return (this.reset());
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
return this.postMessage(msg);
},
 get$id: function() {
return this.id;
}
});

$.$defineNativeClass('DOMWindow', [], {
 setInterval$2: function(handler, timeout) {
  return (this.setInterval($.convertDartClosureToJS(handler, 0),timeout));
},
 setTimeout$2: function(handler, timeout) {
  return (this.setTimeout($.convertDartClosureToJS(handler, 0),timeout));
}
});

// 131 dynamic classes.
// 277 classes
// 23 !leaf
(function(){
  var v0/*class(_SVGElementImpl)*/ = 'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement';
  var v1/*class(_ElementImpl)*/ = [v0/*class(_SVGElementImpl)*/,v0/*class(_SVGElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v2/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v3/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v4/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['SVGElement', v0/*class(_SVGElementImpl)*/],
    ['Element', v1/*class(_ElementImpl)*/],
    ['DocumentFragment', v2/*class(_DocumentFragmentImpl)*/],
    ['HTMLDocument', v3/*class(_DocumentImpl)*/],
    ['CharacterData', v4/*class(_CharacterDataImpl)*/],
    ['Node', [v1/*class(_ElementImpl)*/,v2/*class(_DocumentFragmentImpl)*/,v3/*class(_DocumentImpl)*/,v4/*class(_CharacterDataImpl)*/,v1/*class(_ElementImpl)*/,v2/*class(_DocumentFragmentImpl)*/,v3/*class(_DocumentImpl)*/,v4/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|')],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList'],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
