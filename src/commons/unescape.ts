/*
The MIT License (MIT)

Copyright (c) Ivan Akulov <mail@iamakulov.com> (http://iamakulov.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// https://github.com/iamakulov/unescape-js

// import 'string.fromcodepoint';

/**
 * \\ - matches the backslash which indicates the beginning of an escape sequence
 * (
 *   u\{([0-9A-Fa-f]+)\} - first alternative; matches the variable-length hexadecimal escape sequence (\u{ABCD0})
 * |
 *   u([0-9A-Fa-f]{4}) - second alternative; matches the 4-digit hexadecimal escape sequence (\uABCD)
 * |
 *   x([0-9A-Fa-f]{2}) - third alternative; matches the 2-digit hexadecimal escape sequence (\xA5)
 * |
 *   ([1-7][0-7]{0,2}|[0-7]{2,3}) - fourth alternative; matches the up-to-3-digit octal escape sequence (\5 or \512)
 * |
 *   (['"tbrnfv0\\]) - fifth alternative; matches the special escape characters (\t, \n and so on)
 * |
 *   \U([0-9A-Fa-f]+) - sixth alternative; matches the 8-digit hexadecimal escape sequence used by python (\U0001F3B5)
 * )
 */
const jsEscapeRegex = /\\(u\{([0-9A-Fa-f]+)\}|u([0-9A-Fa-f]{4})|x([0-9A-Fa-f]{2})|([1-7][0-7]{0,2}|[0-7]{2,3})|(['"tbrnfv0\\]))|\\U([0-9A-Fa-f]{8})/g;

const usualEscapeSequences: any = {
    '0': '\0',
    'b': '\b',
    'f': '\f',
    'n': '\n',
    'r': '\r',
    't': '\t',
    'v': '\v',
    '\'': '\'',
    '"': '"',
    '\\': '\\'
};

const fromHex = (str: string) => String.fromCodePoint(parseInt(str, 16));
const fromOct = (str: string) => String.fromCodePoint(parseInt(str, 8));

export default (string: string) => {
    return string.replace(jsEscapeRegex, (_, __, varHex, longHex, shortHex, octal, specialCharacter, python) => {
        if (varHex !== undefined) {
            return fromHex(varHex);
        } else if (longHex !== undefined) {
            return fromHex(longHex);
        } else if (shortHex !== undefined) {
            return fromHex(shortHex);
        } else if (octal !== undefined) {
            return fromOct(octal);
        } else if (python !== undefined) {
            return fromHex(python);
        } else {
            return usualEscapeSequences[specialCharacter];
        }
    });
};
