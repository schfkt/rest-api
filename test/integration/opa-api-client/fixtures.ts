export const existingUserResponse = {
  result: {
    licenseKey: "some-very-secure-license-key",
    hasAccessToFeatures: ["makeFrappe"],
  },
};

export const nonExistingUserResponse = {};

export const nonEmptyListOfFeatures = {
  result: {
    walkTheDog: {
      description: "Allows a user to walk The Dog",
    },
    ruleTheEmpire: {
      description: "Allows a user to rule The Empire",
    },
  },
};

export const emptyListOfFeatures = {};
