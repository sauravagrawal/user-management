module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!axios)/"],
  moduleFileExtensions: ["ts", "tsx"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};
