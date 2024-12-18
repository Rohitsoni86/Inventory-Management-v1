/** @type {import('prettier').Config} */
const config = {
  // General formatting settings
  semi: true, // Add semicolons
  singleQuote: false, // Use single quotes
  tabWidth: 2, // Indent with 2 spaces
  printWidth: 80, // Line length
  trailingComma: "es5", // Trailing commas in ES5 (objects, arrays)
  arrowParens: "always", // Always include parentheses in arrow functions
  endOfLine: "auto", // Consistent line endings across different OS

  // Specific configuration for different file types
  overrides: [
    {
      files: "*.{js,jsx,ts,tsx}",
      options: {
        singleQuote: false,
        trailingComma: "es5",
      },
    },
    {
      files: "*.json",
      options: {
        singleQuote: false,
      },
    },
  ],

  // Plugins (if needed)
  plugins: [
    // Add any Prettier plugins here
  ],
};

export default config;
