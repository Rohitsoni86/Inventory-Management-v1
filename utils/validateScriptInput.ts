export const validateXSS = (value: string | number): boolean => {
  if (value) {
    // Regex to match any HTML tags and JavaScript code
    const regex = /<[^>]*>|javascript:/gi;
    return !regex.test(`${value}`);
  }
  return true;
};

export const validateSpecialCharacters = (value: string | number): boolean => {
  if (value) {
    // Regex to match only alphabets, dots, dashes, underscores, slash, and spaces
    const regex = /^[a-zA-Z_.\-/\s]+$/;

    // Return true if the value does not match the allowed characters (invalid characters)
    return !regex.test(`${value}`);
  }
  return false; // Return false if value is empty or undefined
};
