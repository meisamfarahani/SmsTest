export function filterObjectArray(array, filterKey, filterTerm) {
  const lowerCaseFilterTerm = filterTerm.toLowerCase();
  if (array && array.length > 0)
    if (filterKey.length > 1) {
      return array.filter(
        (rowData) =>
          (rowData[filterKey[0]] &&
            rowData[filterKey[0]]
              .toLowerCase()
              .startsWith(lowerCaseFilterTerm)) ||
          (rowData[filterKey[1]] &&
            rowData[filterKey[1]].toLowerCase().startsWith(lowerCaseFilterTerm))
      );
    } else if (filterKey.length > 0) {
      return array.filter(
        (rowData) =>
          rowData[filterKey[0]] &&
          rowData[filterKey[0]].toLowerCase().startsWith(lowerCaseFilterTerm)
      );
    }
}

export function sortObjectArray(array, sortKey, isAscending) {
  if (array && array.length > 0) {
    const results = array.sort((rowDataA, rowDataB) => {
      if (!rowDataA || !rowDataB) return 0;
      const a = rowDataA[sortKey];
      const b = rowDataB[sortKey];
      if (typeof a === "string" && typeof b === "string") {
        // If strings, sort case-insensitive
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }
      // If any other type of object, e.g. a number, just use the natural ordering
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    if (!isAscending) return results.reverse();
    return results;
  }
}

const jsHelper = {
  NumberRegex: /^\d+$/,
  FloatRegex: /^[+-]?\d+([,\.]\d+)?$/,
  CurrencyRegex: /^(?!0\.0)\d{1,3}(,\d{3})*(\.\d+)?$/,
  EmailRegex:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,

  replaceAllString: function (input, find, replace) {
    try {
      return input.replace(new RegExp(find, "gi"), replace);
    } catch (err) {
      return input;
    }
  },
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getPersianDigit: function (input) {
    var inputS = input?.toString() || "";
    if (inputS.length > 0) {
      var fardigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      var result = "";
      for (var i = 0; i < inputS.length; i++) {
        result += fardigits[inputS[i]] ? fardigits[inputS[i]] : inputS[i];
      }
      return result;
    }
    return input;
  },

  getEnglishDigit: function (input, removeLetters, integer, signed, eventType) {
    var inputS = input?.toString() || "";
    if (inputS.length > 0) {
      removeLetters = removeLetters || false;
      integer = integer || false;
      signed = signed || false;
      eventType = eventType || "";

      var fardigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      var engdigits = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        "/",
        ",",
      ];

      if (integer) {
        engdigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      }

      var result = "";

      if (signed) if (inputS[0] == "-") result = "-";

      for (var i = 0; i < inputS.length; i++) {
        result +=
          fardigits.indexOf(inputS[i]) > -1
            ? fardigits.indexOf(inputS[i])
            : removeLetters && engdigits.indexOf(inputS[i]) < 0
            ? ""
            : inputS[i];
      }

      if (!integer && removeLetters) {
        result = result.replace("/", ".");
        if (result.indexOf("-.") == 0) {
          result = result.replace("-.", "-0.");
        } else if (result.indexOf(".") == 0) {
          result = result.replace(".", "0.");
        }

        if (result.indexOf(".") > 0)
          if (result.indexOf(".") != result.lastIndexOf(".")) {
            var temp = result.split(".");

            result = temp[0] + ".";

            for (var ii = 1; ii < temp.length; ii++) {
              result += temp[ii];
            }
          }

        if (
          eventType == "blur" ||
          eventType == "focusout" ||
          eventType == "paste"
        )
          if (result.lastIndexOf(".") == result.length - 1) {
            result = result.replace(".", "");
          }
      }
      return result;
    }
    return input;
  },

  getAllIndexes: function (array, value) {
    var indexes = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) indexes.push(i);
    }
    return indexes;
  },

  //  shuffles elements of an input array
  shuffle: function (arrayToShuffle) {
    if (arrayToShuffle != null && arrayToShuffle.length > 0) {
      var j,
        x,
        i = 0;
      for (i = arrayToShuffle.length; i; i--) {
        j = this.getRandomInt(0, arrayToShuffle.length - 1);
        x = arrayToShuffle[i - 1];
        arrayToShuffle[i - 1] = arrayToShuffle[j];
        arrayToShuffle[j] = x;
      }
    }
    return arrayToShuffle;
  },

  // seperates numbers every three digits
  getCurrencyFormat: function (number, separator) {
    try {
      separator = separator || ",";
      if (number != null) {
        number = this.replaceAllString(number.toString(), ",", "");

        let dotIndex = number.lastIndexOf(".");

        if (dotIndex > 0) {
          let spl = [
            number.substring(0, dotIndex),
            number.substring(dotIndex + 1),
          ];

          number =
            spl[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator) +
            "." +
            spl[1];
        } else
          number = number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator);

        return number;
      }
    } catch (err) {
      console.log(err);
      return number;
    }
  },

  currencyToFloat: function (input, _default = 0) {
    input = this.replaceAllString(input, ",", "");
    return parseFloat(input) || _default;
  },
};

export default jsHelper;
