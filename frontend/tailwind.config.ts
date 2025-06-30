// Remove the import and use `any` for Config to avoid the type error

// type Config = any;

const config: any = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


