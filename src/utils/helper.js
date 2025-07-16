export const somenteNumero = (value, ponto = false) => {
    const valorLimpo = value.trim();
    if (ponto) {
        return valorLimpo.replace(/[^\d.]/g, '');
    } else {
        return valorLimpo.replace(/[^\d]/g, '');
    }
}

export const formatoCpfCnpj = (str) => {
    if (str === "" || str === undefined) {
        return "";
    }

    if (str.length > 11) {
        var part1 = str.substring(0, 2);
        var part2 = str.substring(2, 5);
        var part3 = str.substring(5, 8);
        var part4 = str.substring(8, 12);
        var part5 = str.substring(12);

        return part1 + '.' + part2 + '.' + part3 + '/' + part4 + '-' + part5;
    } else {
        var part1 = str.substring(0, 3);
        var part2 = str.substring(3, 6);
        var part3 = str.substring(6, 9);
        var part4 = str.substring(9, 11);

        return part1 + '.' + part2 + '.' + part3 + '-' + part4;
    }
}

export const dateBr = (date) => {
    if (date) {
        let fullDate = new Date(date + ' 01:00:00');
        let day = fullDate.getDate();
        let month = (fullDate.getMonth() + 1);
        let year = fullDate.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return [day, month, year].join('/');
    } else {
        return '';
    }
}

export const removeSeparador = (str) => {
    if (str === undefined) {
        return '';
    }
    str = str.replaceAll('.', '');
    str = str.replaceAll(',', '');
    str = str.replaceAll('-', '');
    str = str.replaceAll('(', '');
    str = str.replaceAll(')', '');
    str = str.replaceAll('/', '');
    str = str.replaceAll('_', '');

    return str;
}

export const cpfValidate = (value) => {

    if (value === undefined || value === null) {
        return false;
    }
    value = value.replace(/[^\d]+/g, "");
    // Checking value to have 11 digits only
    if (value.length !== 11) {
        return false;
    }

    var sum = 0,
        firstCN, secondCN, checkResult, i;

    firstCN = parseInt(value.substring(9, 10), 10);
    secondCN = parseInt(value.substring(10, 11), 10);

    checkResult = function (sum, cn) {
        var result = (sum * 10) % 11;
        if ((result === 10) || (result === 11)) {
            result = 0;
        }
        return (result === cn);
    };

    // Checking for dump data
    if (value === "" ||
        value === "00000000000" ||
        value === "11111111111" ||
        value === "22222222222" ||
        value === "33333333333" ||
        value === "44444444444" ||
        value === "55555555555" ||
        value === "66666666666" ||
        value === "77777777777" ||
        value === "88888888888" ||
        value === "99999999999"
    ) {
        return false;
    }

    // Step 1 - using first Check Number:
    for (i = 1; i <= 9; i++) {
        sum = sum + parseInt(value.substring(i - 1, i), 10) * (11 - i);
    }

    // If first Check Number (CN) is valid, move to Step 2 - using second Check Number:
    if (checkResult(sum, firstCN)) {
        sum = 0;
        for (i = 1; i <= 10; i++) {
            sum = sum + parseInt(value.substring(i - 1, i), 10) * (12 - i);
        }
        return checkResult(sum, secondCN);
    }
    return false;
}

export const cnpjValidate = (value) => {
    value = value.replace(/[^\d]+/g, "");

    // Checking value to have 14 digits only
    if (value.length !== 14) {
        return false;
    }

    // Elimina values invalidos conhecidos
    if (value === "00000000000000" ||
        value === "11111111111111" ||
        value === "22222222222222" ||
        value === "33333333333333" ||
        value === "44444444444444" ||
        value === "55555555555555" ||
        value === "66666666666666" ||
        value === "77777777777777" ||
        value === "88888888888888" ||
        value === "99999999999999") {
        return false;
    }

    // Valida DVs
    var length = (value.length - 2);
    var numbers = value.substring(0, length);
    var digits = value.substring(length);
    var sum = 0;
    var pos = length - 7;

    for (var i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    var resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (resultado !== parseInt(digits.charAt(0), 10)) {
        return false;
    }

    length = length + 1;
    numbers = value.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (var il = length; il >= 1; il--) {
        sum += numbers.charAt(length - il) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (resultado !== parseInt(digits.charAt(1), 10)) {
        return false;
    }

    return true;
}
