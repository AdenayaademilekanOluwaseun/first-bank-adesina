// XRegExp 1.1.0
// (c) 2007-2009 Steven Levithan
// <http://xregexp.com>
// MIT License
// provides an augmented, extensible, cross-browser implementation of regular expressions,
// including support for additional syntax, flags, and methods
// prevent running twice, which would break references to native globals and fill the list of
// XRegExp tokens with duplicates
if (!window.XRegExp) {
    var XRegExp;
    // run within an anonymous function to protect variables and avoid new globals
    (function() {
        // accepts a pattern and flags; returns a new, extended `RegExp` object. differs from a
        // native regular expression in that additional flags and syntax are supported and cross-
        // browser regex syntax inconsistencies are ameliorated
        XRegExp = function(pattern, flags) {
            if (XRegExp.isRegExp(pattern)) {
                if (flags !== undefined) throw TypeError("can't supply flags when constructing one RegExp from another");
                return pattern.addFlags("");
            }
            // tokens become part of the regex construction process, so protect against infinite
            // recursion when an XRegExp is constructed within a token handler or trigger
            if (runningTokens) throw Error("can't call the XRegExp constructor within token definition functions");
            var flags = flags || "",
                output = [],
                pos = 0,
                currScope = XRegExp.OUTSIDE_CLASS,
                thisRegex = {
                    hasNamedCapture: false,
                    captureNames: [],
                    hasFlag: function(flag) {
                        if (flag.length > 1) throw SyntaxError("flag can't be more than one character");
                        return flags.indexOf(flag) > -1;
                    }
                },
                tokenResult, match, chr, regex;
            while (pos < pattern.length) {
                // check for custom tokens at the current position
                tokenResult = runTokens(pattern, pos, currScope, thisRegex);
                if (tokenResult) {
                    output.push(tokenResult.output);
                    pos += Math.max(tokenResult.matchLength, 1);
                } else {
                    chr = pattern.charAt(pos);

                    // check for native multicharacter metasequences (excluding character classes)
                    // at the current position
                    if (match = real.exec.call(nativeTokens[currScope], pattern.slice(pos))) {
                        output.push(match[0]);
                        pos += match[0].length;
                    } else {
                        // empty character class shenanigans are handled by a custom token
                        if (chr === "[") currScope = XRegExp.INSIDE_CLASS;
                        else if (chr === "]") currScope = XRegExp.OUTSIDE_CLASS;

                        // advance position one character
                        output.push(chr);
                        pos++;
                    }
                }
            }
            regex = RegExp(output.join(""), real.replace.call(flags, /[^gimy]+/g, ""));
            regex._xregexp = {
                source: pattern,
                captureNames: thisRegex.hasNamedCapture ? thisRegex.captureNames : null
            };
            return regex;
        };

        // private variables
        var replacementToken = /\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,
            compliantExecNpcg = /()??/.exec("")[1] === undefined,
            compliantLastIndexIncrement = function() {
                var x = /^/g;
                x.test("");
                return !x.lastIndex;
            }(),
            compliantLastIndexReset = function() {
                var x = /x/g;
                "x".replace(x, "");
                return !x.lastIndex;
            }(),
            // copy native globals for reference ("native is an ES3 reserved keyword)
            real = {
                exec: RegExp.prototype.exec,
                match: String.prototype.match,
                replace: String.prototype.replace,
                split: String.prototype.split,
                test: RegExp.prototype.test
            },
            runTokens = function(pattern, index, scope, context) {
                var i = tokens.length,
                    result, t, m;
                // protect against constructing XRegExps within token handler and trigger functions
                runningTokens = true;
                while (i--) {
                    t = tokens[i];
                    if ((scope & t.scope) && (!t.trigger || t.trigger.call(context))) {
                        t.pattern.lastIndex = index;
                        m = t.pattern.exec(pattern);
                        if (m && m.index === index) {
                            result = {
                                output: t.handler.call(context, m, scope),
                                matchLength: m[0].length
                            };
                            break;
                        }
                    }
                }
                runningTokens = false;
                return result;
            },
            runningTokens = false,
            nativeTokens = {},
            tokens = [];
        // token scope bitflags
        XRegExp.INSIDE_CLASS = 1;
        XRegExp.OUTSIDE_CLASS = 2;

        // `nativeTokens` match native multicharacter metasequences only (excluding character classes)
        nativeTokens[XRegExp.INSIDE_CLASS] = /^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/;

        nativeTokens[XRegExp.OUTSIDE_CLASS] = /^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/;

        // provides a means to create custom flags and extend or change the regular expression
        // language accepted by `XRegExp`. used internally by the XRegExp library and can be used
        // to create XRegExp plugins. this function is intended for users with advanced knowledge
        // of JavaScript's regular expression syntax and behavior. augments private `tokens`
        XRegExp.addToken = function(pattern, handler, scope, trigger) {
            tokens.push({
                pattern: XRegExp(pattern).addFlags("g"),
                handler: handler,
                scope: scope || XRegExp.OUTSIDE_CLASS,
                trigger: trigger || null
            });
        };
        // adds named capture support (with backreferences returned as `result.name`), and fixes
        // two cross-browser issues per ES3:
        // - captured values for nonparticipating capturing groups should be returned as
        //   `undefined`, rather than the empty string.
        // - `lastIndex` should not be incremented after zero-length matches.
        RegExp.prototype.exec = function(str) {
            var match = real.exec.apply(this, arguments),
                name, r2;
            if (match) {
                if (!compliantExecNpcg && match.length > 1 && XRegExp._indexOf(match, "") > -1) {
                    r2 = RegExp("^" + this.source + "$(?!\\s)", XRegExp._getNativeFlags(this));
                    real.replace.call(match[0], r2, function() {
                        for (var i = 1; i < arguments.length - 2; i++) {
                            if (arguments[i] === undefined) match[i] = undefined;
                        }
                    });
                }
                // attach named capture properties
                if (this._xregexp && this._xregexp.captureNames) {
                    for (var i = 1; i < match.length; i++) {
                        name = this._xregexp.captureNames[i - 1];
                        if (name) match[name] = match[i];
                    }
                }
                // fix browsers that increment `lastIndex` after zero-length matches
                if (!compliantLastIndexIncrement && this.global && this.lastIndex > (match.index + match[0].length)) this.lastIndex--;
            }
            return match;
        };
        // avoid overriding `RegExp.prototype.test` if it doesn't help anything
        if (!compliantLastIndexIncrement) {
            RegExp.prototype.test = function(str) {
                // use the native `exec` to skip some processing overhead, even though the
                // overriden `exec` would fix `lastIndex` for us
                var match = real.exec.call(this, str);
                if (match && this.global && this.lastIndex > (match.index + match[0].length)) this.lastIndex--;
                return !!match;
            };
        }
        // adds named capture support and fixes browser bugs
        String.prototype.match = function(regex) {
            if (!XRegExp.isRegExp(regex)) regex = RegExp(regex);
            if (regex.global) {
                var result = real.match.apply(this, arguments);
                regex.lastIndex = 0;
                return result;
            }
            return regex.exec(this); // run the altered `exec` (important)
        };
        // adds support for the `${n}` token for named and numbered backreferences in replacement
        // text, and provides named backreferences to replacement functions as `arguments[0].name`.
        // also fixes cross-browser differences in replacement text syntax when performing a
        // replacement using a non-regex search value, and the value of replacement regexes'
        // `lastIndex` property during replacement iterations. note that this doesn't support
        // SpiderMonkey's nonstandard third (`flags`) parameter
        String.prototype.replace = function(search, replacement) {
            var isRegex = XRegExp.isRegExp(search),
                captureNames, result, str;

            // there are many combinations of search/replacement types/values and browser bugs that
            // preclude passing to native `replace`, so just keep this check relatively simple
            if (isRegex && typeof replacement.valueOf() === "string" && replacement.indexOf("${") === -1 && compliantLastIndexReset) return real.replace.apply(this, arguments);
            if (!isRegex) search = search + "";
            else if (search._xregexp) captureNames = search._xregexp.captureNames;
            if (typeof replacement === "function") {
                result = real.replace.call(this, search, function() {
                    if (captureNames) {
                        // change the `arguments[0]` string primitive to a String object which can store properties
                        arguments[0] = new String(arguments[0]);
                        for (var i = 0; i < captureNames.length; i++) {
                            if (captureNames[i]) arguments[0][captureNames[i]] = arguments[i + 1];
                        }
                    }
                    // update `lastIndex` before calling `replacement`
                    if (isRegex && search.global) search.lastIndex = arguments[arguments.length - 2] + arguments[0].length;
                    return replacement.apply(window, arguments);
                });
            } else {
                str = this + ""; // type conversion, so `args[args.length - 1]` will be a string with nonstring `this`
                result = real.replace.call(str, search, function() {
                    var args = arguments; // keep this function's `arguments` available through closure
                    return real.replace.call(replacement, replacementToken, function($0, $1, $2) {
                        // numbered backreference (without delimiters) or special variable
                        if ($1) {
                            switch ($1) {
                                case "$":
                                    return "$";
                                case "&":
                                    return args[0];
                                case "`":
                                    return args[args.length - 1].slice(0, args[args.length - 2]);
                                case "'":
                                    return args[args.length - 1].slice(args[args.length - 2] + args[0].length);

                                default:

                                    var literalNumbers = "";
                                    $1 = +$1;
                                    if (!$1) return $0;
                                    while ($1 > args.length - 3) {
                                        literalNumbers = String.prototype.slice.call($1, -1) + literalNumbers;
                                        $1 = Math.floor($1 / 10);
                                    }
                                    return ($1 ? args[$1] : "$") + literalNumbers;
                            }
                        } else {
                            // what does "${n}" mean?
                            // - backreference to numbered capture n. two differences from "$n":
                            //   - n can be more than two digits.
                            //   - backreference 0 is allowed, and is the entire match.
                            // - backreference to named capture n, if it exists and is not a
                            //   number overridden by numbered capture.
                            // - otherwise, it's the string "${n}".


                            var n = +$2;
                            if (n <= args.length - 3) return args[n];
                            n = captureNames ? XRegExp._indexOf(captureNames, $2) : -1;
                            return n > -1 ? args[n + 1] : $0;
                        }
                    });
                });
            }
            if (isRegex && search.global) search.lastIndex = 0;
            search.lastIndex = 0; // fix IE bug
            return result;
        };
        // a consistent cross-browser, ES3-compliant `split`
        String.prototype.split = function(s, limit) {
            // if separator `s` is not a regex, use the native `split`
            if (!XRegExp.isRegExp(s)) return real.split.apply(this, arguments);
            var str = this + "", // type conversion
                output = [],
                lastLastIndex = 0,
                match, lastLength;
            // behavior for `limit`: if it's...
            // - `undefined`: no limit.
            // - `NaN` or zero: return an empty array.
            // - a positive number: use `Math.floor(limit)`.
            // - a negative number: no limit.
            // - other: type-convert, then use the above rules.
            if (limit === undefined || +limit < 0) {
                limit = Infinity;
            } else {
                limit = Math.floor(+limit);
                if (!limit) return [];
            }
            // this is required if not `s.global`, and it avoids needing to set `s.lastIndex` to
            // zero and restore it to its original value when we're done using the regex
            s = s.addFlags("g"); // new copy

            while (match = s.exec(str)) { // run the altered `exec` (important)
                if (s.lastIndex > lastLastIndex) {
                    output.push(str.slice(lastLastIndex, match.index));
                    if (match.length > 1 && match.index < str.length) Array.prototype.push.apply(output, match.slice(1));
                    lastLength = match[0].length;
                    lastLastIndex = s.lastIndex;
                    if (output.length >= limit) break;
                }
                if (!match[0].length) s.lastIndex++;
            }
            if (lastLastIndex === str.length) {
                if (!real.test.call(s, "") || lastLength) output.push("");
            } else {
                output.push(str.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    })();
    //--------------------

    // accepts flags; returns a new `RegExp` object generated by recompiling the regex with the
    // additional flags (may include non-native flags). the original regex object is not altered
    RegExp.prototype.addFlags = function(flags) {
        var regex = XRegExp(this.source, (flags || "") + XRegExp._getNativeFlags(this)),
            x = this._xregexp;
        if (x) {
            regex._xregexp = {
                source: x.source,
                captureNames: x.captureNames ? x.captureNames.slice(0) : null
            };
        }
        return regex;
    };
    // accepts a context object and arguments array; returns the result of calling `exec` with the
    // first value in the arguments array. the context is ignored but is accepted for congruity
    // with `Function.prototype.apply`
    RegExp.prototype.apply = function(context, args) {
        return this.exec(args[0]);
    };
    // accepts a context object and string; returns the result of calling `exec` with the provided
    // string. the context is ignored but is accepted for congruity with `Function.prototype.call`
    RegExp.prototype.call = function(context, str) {
        return this.exec(str);
    };
    // accepts a string; returns an array of match arrays (as if returned by `exec`) for each match
    // of `this` within the string. match arrays contain `index` and `input` properties that
    // indicate the match position and subject string (respectively), matched text as `match[0]`,
    // backreferences as `match[n]`, and named backreferences as `match.name`
    RegExp.prototype.execAll = function(str) {
        var regex = this.addFlags("g"), // new copy
            result = [],
            match;

        while (match = regex.exec(str)) { // run the altered `exec` (important)
            result.push(match);
            if (!match[0].length)
                regex.lastIndex++; // avoid an infinite loop
        }
        if (this.global) this.lastIndex = 0;
        return result;
    };
    // executes `callback` once per match within `str`. provides a simpler and cleaner way to
    // iterate over regex matches compared to the traditional approaches of subverting
    // `String.prototype.replace` or repeatedly calling `exec` within a `while` loop
    RegExp.prototype.forEachExec = function(str, callback, context) {
        var regex = this.addFlags("g"), // new copy
            i = -1,
            match;

        while (match = regex.exec(str)) { // run the altered `exec` (important)
            callback.call(context, match, ++i, str, regex);
            if (!match[0].length)
                regex.lastIndex++; // avoid an infinite loop
        }
        if (this.global) this.lastIndex = 0;
    };
    // returns `true` only if the entire string is matched by the regex (i.e., a match is found at
    // the beginning of the string, and that match extends to the end of the string); otherwise
    // `false` is returned. when using the /m flag (which causes ^ and $ metacharacters to match at
    // the beginning and end of each line), this may differ from the result of calling
    // `RegExp.prototype.test` on a regular expression that starts with ^ and ends with $, since
    // the `validate` method's functionality is not altered by the /m flag.
    RegExp.prototype.validate = function(str) {
        var regex = RegExp("^(?:" + this.source + ")$(?!\\s)", XRegExp._getNativeFlags(this));
        if (this.global) this.lastIndex = 0;
        return str.search(regex) === 0;
    };
    // accepts a pattern and flags; returns an extended `RegExp` object. if the pattern and flag
    // combination has previously been cached, the cached copy is returned, otherwise the new
    // object is cached
    XRegExp.cache = function(pattern, flags) {
        var key = "/" + pattern + "/" + (flags || "");
        return XRegExp.cache[key] || (XRegExp.cache[key] = XRegExp(pattern, flags));
    };
    // accepts a string; returns the string with regex metacharacters escaped. the returned string
    // can safely be used at any point within a regex to match the provided literal string. escaped
    // characters are [, ], {, }, (, ), -, *, +, ?, ., \, ^, $, |, #, <comma>, and whitespace
    XRegExp.escape = function(str) {
        return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, "\\$&");
    };
    // breaks the unrestorable link to XRegExp's private list of tokens, and thereby prevents the
    // addition of new syntax and flags. should be run after XRegExp and any plugins are loaded
    XRegExp.freezeTokens = function() {
        XRegExp.addToken = null;
    };
    // accepts any value; returns a boolean indicating whether the argument is a `RegExp` object
    // (note that this is also true for regex literals and regexes created using the `XRegExp`
    // constructor). this works correctly for variables created in another frame, when `instanceof`
    // and `regex.constructor` checks would fail to work as intended
    XRegExp.isRegExp = function(o) {
        return Object.prototype.toString.call(o) === "[object RegExp]";
    };
    // accepts a string to search, an array of regexes, and a boolean indicating whether an array
    // of strings or an array of match arrays should be returned. the returned results are
    // generated by using each successive regex to search within the matches of the previous regex.
    // e.g., `XRegExp.matchWithinChain("1 <b>2</b> 3 <b>4 5</b>", [/<b>.*?<\/b>/, /\d+/])` returns
    // `["2", "4", "5"]`. when returning match arrays instead of strings, each array's `index`
    // property is set relative to the entire subject string.
    // << possible feature for future versions: search within backreferences of prior regexes,
    // e.g., [/x(x)/, {within:1, search:XRegExp("(?<n>x)")}, {within:"n", search:/x/}] >>
    XRegExp.matchWithinChain = function(str, regexes, detailMode) {
        var match;

        function recurse(values, level) {
            var regex = regexes[level].addFlags("g"),
                result = [],
                matches, i, j;
            for (i = 0; i < values.length; i++) {
                if (detailMode) {
                    matches = regex.execAll(values[i][0]);
                    for (j = 0; j < matches.length; j++)
                        matches[j].index += values[i].index;
                } else {
                    matches = values[i].match(regex);
                }
                if (matches) result.push(matches);
            }
            // flatten all the `result` arrays into one array
            result = Array.prototype.concat.apply([], result);
            if (regexes[level].global) regexes[level].lastIndex = 0;
            return level === regexes.length - 1 ? result : recurse(result, level + 1);
        };
        if (detailMode) match = {
            "0": str,
            index: 0
        };
        return recurse([detailMode ? match : str], 0);
    };
    // intentionally undocumented. may be renamed or removed in the future
    XRegExp._getNativeFlags = function(regex) {
        return (regex.global ? "g" : "") + (regex.ignoreCase ? "i" : "") + (regex.multiline ? "m" : "") + (regex.extended ? "x" : "") + (regex.sticky ? "y" : "");
    };
    // intentionally undocumented. may be renamed or removed in the future. similar to
    // `Array.prototype.indexOf` from JS1.6/ES5
    XRegExp._indexOf = function(array, item, from) {
        for (var i = from || 0; i < array.length; i++)
            if (array[i] === item) return i;
        return -1;
    };
    //--------------------

    // augment XRegExp's regular expression syntax and flags. this comes last so that tokens can
    // take advantage of all XRegExp features
    (function() {
        // shared variable
        var quantifier = /^(?:[?*+]|{\d+(?:,\d*)?})\??/;
        // note that when adding tokens, the `scope` argument defaults to `XRegExp.OUTSIDE_CLASS`

        // comment pattern, e.g. (?#...)
        XRegExp.addToken(
            /\(\?#[^)]*\)/,
            function(match) {
                // keep tokens separated unless the following token is a quantifier
                return quantifier.test(match.input.slice(match.index + match[0].length)) ? "" : "(?:)";
            });
        // capturing group (match the opening parenthesis only).
        // required for support of named capturing groups
        XRegExp.addToken(/\((?!\?)/, function() {
            this.captureNames.push(null);
            return "(";
        });
        // named capturing group (match the opening delimiter only)
        XRegExp.addToken(/\(\?<([$\w]+)>/, function(match) {
            this.captureNames.push(match[1]);
            this.hasNamedCapture = true;
            return "(";
        });
        // named backreference, e.g. \k<name>
        XRegExp.addToken(/\\k<([\w$]+)>/, function(match) {
            var index = XRegExp._indexOf(this.captureNames, match[1]);
            // keep backreferences separate from subsequent literal numbers. preserve back-
            // references to named groups that are undefined at this point as literal strings
            return index > -1 ? "\\" + (index + 1) + (isNaN(match.input.charAt(match.index + match[0].length)) ? "" : "(?:)") : match[0];
        });
        // empty character class: [] or [^]
        XRegExp.addToken(/\[\^?]/, function(match) {
            // for cross-browser compatibility with ES3, convert [] to \b\B and [^] to [\s\S].
            // (?!) should work like \b\B, but is unreliable in Firefox
            return match[0] === "[]" ? "\\b\\B" : "[\\s\\S]";
        });
        // whitespace and comments, in free-spacing (aka extended) mode only
        XRegExp.addToken(/(?:\s+|#.*)+/, function(match) {
            // keep tokens separated unless the following token is a quantifier
            return quantifier.test(match.input.slice(match.index + match[0].length)) ? "" : "(?:)";
        }, XRegExp.OUTSIDE_CLASS, function() {
            return this.hasFlag("x");
        });

        // dot, in dotall (aka singleline) mode only
        XRegExp.addToken(/\./, function() {
            return "[\\s\\S]";
        }, XRegExp.OUTSIDE_CLASS, function() {
            return this.hasFlag("s");
        });
    })();
    XRegExp.version = "1.1.0";

} // end `if (!window.XRegExp)`