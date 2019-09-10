const mockData = {
  source: "partner1",
  data: {
    unid: "1234567",
    firstName: "John",
    lastName: "Doe",
    emailAddress: "John.Doe@wolterskluwer.com",
    phoneNumber: "1-123-456-7890",
    countryCode: "USA",
    consentForDetails: true,
    marketingConsent: true 
  }
}

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

const firstValidator = new Validator({
  unid: validateUnid,
  emailAddress: validateEmail,
  phoneNumber: validatePhone,
});


// tests
describe('validator', function () {
  const validator = new Validator();

  it('it', function () {
  });
});
