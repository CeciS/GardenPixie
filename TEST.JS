var is_time = function (hour, cb) {
  var myhour = '16:00'
  if (myhour === hour) {
    cb(false, true)
  } else {
    cb(false, false)
  }
}

var sendNot = function (err, sendnow) {
  if (err) {
    return false
  }
  if (sendnow) {
        // mando not
  } else {
  }
}


is_time('16:00', sendNot)
