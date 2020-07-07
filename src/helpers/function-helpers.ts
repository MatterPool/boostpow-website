// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time.
export function throttle(func, wait) {
  // tslint:disable-next-line:no-var-keyword
  var context, args, timeout, throttling, more, result;
  // tslint:disable-next-line:prefer-const
  let whenDone = debounce(function() {
    more = throttling = false;
  }, wait);
  return function() {
    context = this;
    args = arguments;
    // tslint:disable-next-line:prefer-const
    let later = function() {
      timeout = null;
      if (more) func.apply(context, args);
      whenDone();
    };
    if (!timeout) timeout = setTimeout(later, wait);
    if (throttling) {
      more = true;
    } else {
      result = func.apply(context, args);
    }
    whenDone();
    throttling = true;
    return result;
  };
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate: boolean = false) {
  let timeout;
  return function() {
    const context = this,
      args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    if (immediate && !timeout) func.apply(context, args);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
