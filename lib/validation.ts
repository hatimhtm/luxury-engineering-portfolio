export const isValidName = (name: string): boolean => {
    return typeof name === 'string' && name.trim().length > 0;
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && emailRegex.test(email);
};

export const isValidBudget = (budget: string): boolean => {
    return typeof budget === 'string' && budget.trim().length > 0;
};

export const isValidBrief = (brief: string): boolean => {
    return typeof brief === 'string' && brief.trim().length > 10;
};
