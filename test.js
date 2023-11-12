var textSource = parent.text.sourceText;
var thisIndex = name - parent.effect("Starting Comp")("Slider");
var parentLayer = parent;
var centered = parentLayer.effect("Center Text")("Checkbox");
var finalval = 0;
if (textSource.numKeys > 0) {
  var keyIndex =
    textSource.key(textSource.nearestKey(time).index).time > time
      ? Math.max(0, textSource.nearestKey(time).index - 1)
      : textSource.nearestKey(time).index;
  var currentKeyArray = findChar(
    keyIndex,
    parent,
    0,
    effect("Seed")("Slider")
  );
  var currKeyTime = currentKeyArray[0];
  var nextKeyArray = findChar(
    keyIndex + 1,
    parent,
    1,
    effect("Seed")("Slider")
  );
  var nextKeyTime = nextKeyArray[0];
  var startingFrame = parentLayer.effect("Starting Frame")("Slider").value;
  var endingFrame = parentLayer.effect("Ending Frame")("Slider").value;
  var omitStart = parentLayer.effect("Omit Start")("Slider").value;
  var omitEnd = parentLayer.effect("Omit End")("Slider").value;
  var currKeyVal = calculateValue(
    currentKeyArray,
    centered,
    0,
    thisIndex,
    parentLayer
  );
  var nextKeyVal = calculateValue(
    nextKeyArray,
    centered,
    1,
    thisIndex,
    parentLayer
  );
  if (nextKeyVal < currKeyVal) {
    var totalDist = endingFrame - currKeyVal + (nextKeyVal - startingFrame);
    if (nextKeyVal > omitEnd || currKeyVal < omitStart) {
      totalDist = totalDist - (omitEnd - omitStart);
    }
    var interp =
      totalDist > 0 ? linear(time, currKeyTime, nextKeyTime, 0, totalDist) : 0;
    if (currKeyVal > omitEnd) {
      interp = interp - (omitEnd - omitStart);
    }
    if (currKeyVal + interp > endingFrame - (omitEnd - omitStart)) {
      var currentKey = Math.round(
        currKeyVal + interp - endingFrame + startingFrame
      );
      finalval =
        currKeyVal + interp >= omitStart
          ? Math.round(currentKey + omitEnd - omitStart)
          : currentKey;
    } else {
      finalval = Math.round(currKeyVal + interp);
    }
    if (finalval >= omitStart) {
      finalval = finalval + (omitEnd - omitStart + 1);
    }
  } else {
    if (nextKeyTime > currKeyTime && currKeyVal != nextKeyVal) {
      if (currKeyVal == startingFrame - 1 && nextKeyVal == endingFrame + 1) {
        finalval = currKeyVal;
      } else {
        var totalDist = nextKeyVal - currKeyVal;
        if (currKeyVal <= omitStart && nextKeyVal >= omitEnd) {
          totalDist = totalDist - (omitEnd - omitStart);
        }
        if (totalDist > timeToFrames(nextKeyTime) - timeToFrames(currKeyTime)) {
          var interp =
            totalDist > 0 && currKeyTime !== nextKeyTime
              ? linear(time, currKeyTime, nextKeyTime, 0, totalDist)
              : 0;
        } else {
          var interp =
            totalDist > 0 && currKeyTime !== nextKeyTime
              ? linear(
                  time,
                  currKeyTime,
                  currKeyTime + framesToTime(totalDist),
                  0,
                  totalDist
                )
              : 0;
        }
        if (currKeyVal > omitEnd) {
          interp = interp - (omitEnd - omitStart + 1);
        }
        finalval =
          Math.round(currKeyVal + interp) >= omitStart
            ? Math.round(currKeyVal + interp) + (omitEnd - omitStart + 1)
            : Math.round(currKeyVal + interp);
      }
    } else {
      finalval = currKeyVal;
    }
  }
}
value = finalval;
function findChar(keyIndex, parentLayer, currentNext, seed) {
  seedRandom(keyIndex + seed + parentLayer.index, true);
  if (keyIndex == 0) {
    return [
      0 + random(0, framesToTime(parentLayer.effect("Random Start")("Slider"))),
      "",
      0,
    ];
  } else {
    var textSource = parentLayer.text.sourceText;
    if (keyIndex > textSource.numKeys) {
      keyIndex--;
    }
    var keyStr = textSource.key(keyIndex).value;
    var keyLetters = keyStr.length;
    var keyTime =
      currentNext == 1
        ? textSource.key(keyIndex).time -
          random(0, framesToTime(parentLayer.effect("Random Start")("Slider")))
        : textSource.key(keyIndex).time +
          random(0, framesToTime(parentLayer.effect("Random Start")("Slider")));
    return [keyTime, keyStr, keyLetters];
  }
}
function calculateValue(
  keyArray,
  centered,
  currentNext,
  thisIndex,
  parentLayer
) {
  var keyVal = -1;
  var keyTime = keyArray[0];
  var keyStr = keyArray[1];
  var keyLetters = keyArray[2];
  if (centered.valueAtTime(keyTime) == 0) {
    if (keyLetters > 0 && thisIndex < keyLetters) {
      keyVal = keyStr.charCodeAt(thisIndex) * 5 + 2;
    }
  } else {
    if (keyLetters > 0) {
      var modifiedIndex =
        thisIndex -
        (Math.ceil(parentLayer.effect("Max Comps")("Slider") / 2) -
          Math.ceil(keyLetters / 2));
      if (modifiedIndex < keyLetters && modifiedIndex > -1) {
        keyVal = keyStr.charCodeAt(modifiedIndex) * 5 + 2;
      }
    }
  }
  if (
    keyVal == 162 ||
    keyVal == -1 ||
    (keyVal >= parentLayer.effect("Omit Start")("Slider") &&
      keyVal <= parentLayer.effect("Omit End")("Slider"))
  ) {
    keyVal =
      currentNext == 1
        ? parentLayer.effect("Ending Frame")("Slider") + 1
        : parentLayer.effect("Starting Frame")("Slider") - 1;
  }
  return keyVal;
}
