/**
 * Created by dujinqiao on 16-7-28.
 */


function isValueNum(input) {
    function IsNum(s) {
        if (s != null && s != "") {
            return !isNaN(s);
        }
        return false;
    }

    if (input.length === 5 || input.length === 9 || input.length === 10) {
        if (input[5] === '-') {
            let number = input.split('-');
            input = number[0].concat(number[1]);

            return IsNum(input);
        }
        else {
            return IsNum(input);
        }

    }
    else {
        return 'Opes!Your input is wrong';
    }
}


function verify(input) {
    let verifiedNum = [];
    let cd = 0;
    let splitInput = input.split("");
    let sum = splitInput.reduce(function (a, b) {
        if (b !== '-') {
            a = parseInt(a) + parseInt(b);
        }
        return a;
    });
    verifiedNum = input.slice(0, 5) + input.slice(6, 10);    //verifiedNum='450561234'
    if (sum % 10 === 0) {
        verifiedNum += '0';
    }
    else {
        cd = (10 - sum % 10).toString();
        verifiedNum += cd;
    }
    return verifiedNum;
}


function matchCode(verifiedNum) {
    let barcodes = [];
    let arr = verifiedNum.split('');
    for (let code of arr) {
        switch (code) {
            case '1' :
                barcodes.push(':::||');
                break;
            case '2':
                barcodes.push('::|:|');
                break;
            case '3':
                barcodes.push('::||:');
                break;
            case '4':
                barcodes.push(':|::|');
                break;
            case '5':
                barcodes.push(':|:|:');
                break;
            case '6':
                barcodes.push(':||::');
                break;
            case '7':
                barcodes.push('|:::|');
                break;
            case '8':
                barcodes.push('|::|:');
                break;
            case '9':
                barcodes.push('|:|::');
                break;
            case '0':
                barcodes.push('||:::');
                break;
        }
    }
    return barcodes;
}


function numIntoBar(input) {
    let barcodes = matchCode(verify(input));
    let text = 'Validation Check:       ' + input + '   ==   |' + barcodes.join("") + '|' + '\n' + 'cd is ' + verify(input).slice(-1);
    return text;
}


function isValueAll(input) {
    return true;
}
function isValue(input) {
    let bool = true;
    for (let i of input) {
        if (i !== '|' && i !== ' ' && i !== ':') {
            return bool = false;
        }
    }
    return bool;
}

function hasFrame(barcode) {
    let bool = false;
    let arr = barcode.split('');
    if (arr[0] === '|' && arr[1] === ' ' && arr[arr.length - 1] === '|' && arr[arr.length - 2] === ' ') {
        bool = true;
    }
    return bool;
}

function isFiveLength(input) {
    let bool = true;
    let arr = input.split(' ');
    for (let i of arr) {
        if (i.length !== 5) {
            bool = false;
        }
    }
    return bool;
}


function loadAllCodes() {
    return [
        '||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'
    ];
}


function splitCode(input) {
    let splitedCodes = [];
    input = input.slice(1, -1).split(" ");
    for (let item of input) {
        splitedCodes.push(item);
    }
    return splitedCodes;
}

function matchNum(splitedCodes) {
    let allCodes = loadAllCodes();
    let matchedNum = '';

    for (let i = 0; i < splitedCodes.length; i++) {
        for (let j = 0; j < allCodes.length; j++) {
            if (splitedCodes[i] === allCodes[j]) {
                matchedNum += j;
            }
        }
    }

    return matchedNum;
}

function codeTurnNum(barcode) {
    let splitedCodes = splitCode(barcode);
    let nums = matchNum(splitedCodes);
    let text = '';

    if (nums.length === 6) {
        text += 'Validation Check:       ' + barcode + '   ==   ' + parseInt(nums.slice(0, -1)) + '\n' + 'cd is ' + nums.slice(-1);
    }
    else if (nums.length === 10) {
        text += 'Validation Check:       ' + barcode + '   ==   ' + nums.slice(0, 5) + '-' + nums.slice(5, 9) + '\n' + 'cd is ' + nums.slice(-1);

    }
    return text;
}


module.exports = {
    o: isValueNum,
    a: verify,
    b: matchCode,
    c: numIntoBar,
    d: isValueAll,
    e: splitCode,
    f: matchNum,
    g: codeTurnNum
};