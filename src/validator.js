function validateUnid(unid) {
    return typeof unid === 'string' && /^([0-9]{7})$/g.test(unid);
}

function validateEmail(email) {
    return /^[a-z0-9.]+@(wolterskluwer)\.com$/gi.test(email)
}

function validatePhone(phone) {
    const numbersCount = phone.match(/\d/g).length;
    return numbersCount > 9 && numbersCount < 12 && /^[\d\s-()]*$/g.test(phone);
}

class Validator {
    constructor(validators) {
        this.validators = validators || {};
    }

    validate(claimsData) {
        const fieldsValidity = {};
        for (const field of Object.keys(claimsData)) {
            if (this.validators[field]) {
                fieldsValidity[field] = this.validators[field](claimsData[field]);
            }
        }
        return fieldsValidity;
    }

    addValidator(field, validatorFunc) {
        this.validators[field] = validatorFunc;
    }

    removeValidator(field) {
        delete this.validators[field];
    }
}
