import {
    validateName,
    validateEmail,
    validateBudget,
    validateBrief,
    canAdvanceStep,
    ContactFormData
} from './validation';

describe('Contact Form Validation', () => {
    describe('validateName', () => {
        it('should return true for valid name', () => {
            expect(validateName('John Doe')).toBe(true);
        });

        it('should return false for empty name', () => {
            expect(validateName('')).toBe(false);
        });

        it('should return false for whitespace only name', () => {
            expect(validateName('   ')).toBe(false);
        });
    });

    describe('validateEmail', () => {
        it('should return true for valid email', () => {
            expect(validateEmail('test@example.com')).toBe(true);
        });

        it('should return false for invalid email (missing @)', () => {
            expect(validateEmail('testexample.com')).toBe(false);
        });

        it('should return false for invalid email (missing domain)', () => {
            expect(validateEmail('test@')).toBe(false);
        });

        it('should return false for empty email', () => {
            expect(validateEmail('')).toBe(false);
        });
    });

    describe('validateBudget', () => {
        it('should return true for selected budget', () => {
            expect(validateBudget('$1,000 - $5,000')).toBe(true);
        });

        it('should return false for empty budget', () => {
            expect(validateBudget('')).toBe(false);
        });
    });

    describe('validateBrief', () => {
        it('should return true for brief longer than 10 chars', () => {
            expect(validateBrief('This is a valid brief that is long enough.')).toBe(true);
        });

        it('should return false for brief shorter than 10 chars', () => {
            expect(validateBrief('Short')).toBe(false);
        });

        it('should return false for brief equal to 10 chars', () => {
             // The logic is > 10, so 10 should be false?
             // code: return formData.brief.trim().length > 10;
             // "1234567890" length is 10. 10 > 10 is false.
            expect(validateBrief('1234567890')).toBe(false);
        });

        it('should return true for brief with 11 chars', () => {
            expect(validateBrief('12345678901')).toBe(true);
        });

        it('should return false for whitespace brief', () => {
            expect(validateBrief('           ')).toBe(false);
        });
    });

    describe('canAdvanceStep', () => {
        const validFormData: ContactFormData = {
            name: 'John Doe',
            email: 'john@example.com',
            budget: '$1000',
            brief: 'This is a long enough brief.'
        };

        it('should validate step 0 (name)', () => {
            expect(canAdvanceStep(0, validFormData)).toBe(true);
            expect(canAdvanceStep(0, { ...validFormData, name: '' })).toBe(false);
        });

        it('should validate step 1 (email)', () => {
            expect(canAdvanceStep(1, validFormData)).toBe(true);
            expect(canAdvanceStep(1, { ...validFormData, email: 'invalid' })).toBe(false);
        });

        it('should validate step 2 (budget)', () => {
            expect(canAdvanceStep(2, validFormData)).toBe(true);
            expect(canAdvanceStep(2, { ...validFormData, budget: '' })).toBe(false);
        });

        it('should validate step 3 (brief)', () => {
            expect(canAdvanceStep(3, validFormData)).toBe(true);
            expect(canAdvanceStep(3, { ...validFormData, brief: 'short' })).toBe(false);
        });

        it('should return false for unknown step', () => {
            expect(canAdvanceStep(4, validFormData)).toBe(false);
        });
    });
});
