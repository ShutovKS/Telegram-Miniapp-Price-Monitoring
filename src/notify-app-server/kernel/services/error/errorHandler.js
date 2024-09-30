export const handleError = (error, context = '') => {
    console.error(`Error in ${context}: ${error.message}`);
};
