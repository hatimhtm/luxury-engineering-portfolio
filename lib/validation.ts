export interface ContactFormData {
    name: string;
    email: string;
    budget: string;
    brief: string;
}

export const validateName = (name: string): boolean => name.trim().length > 0;
export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validateBudget = (budget: string): boolean => budget.length > 0;
export const validateBrief = (brief: string): boolean => brief.trim().length > 10;

export const canAdvanceStep = (step: number, formData: ContactFormData): boolean => {
    switch (step) {
        case 0: return validateName(formData.name);
        case 1: return validateEmail(formData.email);
        case 2: return validateBudget(formData.budget);
        case 3: return validateBrief(formData.brief);
        default: return false;
    }
};
