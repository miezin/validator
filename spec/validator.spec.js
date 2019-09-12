describe('validateUnid', () => {

    it('should return true if unid length equal 7 and contains only numbers', () => {
        expect(validateUnid('1234567')).toBeTruthy();
    });

    it('should return false if unid type not a string', () => {
        expect(validateUnid(1231231)).toBeFalsy();
    });

    it('should return false if unid length greater then 7', () => {
        expect(validateUnid('12345678')).toBeFalsy();
    });

    it('should return false if unid length less then 7', () => {
        expect(validateUnid('123456')).toBeFalsy();
    });

    it('should return false if unid contains not a number', () => {
        expect(validateUnid('12_45-d')).toBeFalsy();
    })
});

describe('validateEmail', () => {

    it('should return true if email valid', () => {
        expect(validateEmail('test@wolterskluwer.com')).toBeTruthy();
    });

    it('should return false if email domain not a wolterskluwer.com', () => {
        expect(validateEmail('test@wolters.co')).toBeFalsy();
    });

    it('should return false if email not contains @', () => {
        expect(validateEmail('testwolterskluwer.com')).toBeFalsy();
    });

    it('should return false if local part before @ is empty', () => {
        expect(validateEmail('@wolterskluwer.com')).toBeFalsy();
    });

    it('should return false if local part before @ is empty', () => {
        expect(validateEmail('@wolterskluwer.com')).toBeFalsy();
    });

    it('should return false if email empty', () => {
        expect(validateEmail('')).toBeFalsy();
    });

    it('should return false if email contains any char except 0-9 a-z or .', () => {
        expect(validateEmail('#$%^&*()_@wolterskluwer.com')).toBeFalsy();
    });
});

describe('validatePhoneNumber', () => {

    it('should return true of phone number valid', () => {
        expect(validatePhone('(999)-333-33-22')).toBeTruthy();
    });

    it('should return false if phone number contains number amount less then 10', () => {
        expect(validatePhone('123456789')).toBeFalsy();
    });

    it('should return false if phone number contains number amount greater then 11', () => {
        expect(validatePhone('123456789111')).toBeFalsy();
    });

    it('should return false if phone contains any char except parens, and whitespaces', () => {
        expect(validatePhone('12345678911#@$%^&*_!~')).toBeFalsy();
    });
});


describe('class Validator', () => {
    let firstValidator;
    let mockData;

    beforeEach(() => {
        firstValidator = new Validator({
            unid: validateUnid,
            emailAddress: validateEmail,
            phoneNumber: validatePhone,
        });

        mockData = {
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
        };
    });



    it('it should return validity obj with all valid field', () => {
        const expectValidity = {
            unid: true,
            phoneNumber: true,
            emailAddress: true,
        };
        const objValidity = firstValidator.validate(mockData.data);
        expect(objValidity).toEqual(expectValidity);
    });

    it('it should return validity obj with invalid field uid', () => {
        mockData.data.unid = '546';
        const objValidity = firstValidator.validate(mockData.data);
        expect(objValidity.unid).toBeFalsy();
    });

    it('it should return validity obj with new field when we add new validator', () => {
        firstValidator.addValidator('countryCode', (value) => {
            return value === 'USA';
        });

        const objValidity = firstValidator.validate(mockData.data);
        expect(objValidity.countryCode).toBeTruthy();
    });

    it('it should return validity obj without unid field when we remove unid validator', () => {
        firstValidator.removeValidator('unid');

        const objValidity = firstValidator.validate(mockData.data);
        expect(objValidity.unid).toBeFalsy();
    });
});
