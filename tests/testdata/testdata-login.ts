// testData.ts
// Centralized test data management for authentication tests

export interface UserCredentials {
  email: string;
  password: string;
  description: string;
}

export interface EdgeCaseUser {
  email: string;
  password: string;
  description: string;
}

// Valid users for successful login tests
export const validUsers: UserCredentials[] = [
  {
    email: "harsha.g@email.com",
    password: "Qazwsx@123",
    description: "Org user 1"
  },
  {
    email: "amali.fernando@email.com",
    password: "Qazwsx@123",
    description: "Standard user 1"
  }
];

// Invalid users for negative testing
export const invalidUsers: UserCredentials[] = [
  {
    email: "amali.fernando@email.com",
    password: "WrongPass@123",
    description: "Invalid credentials"
  },
  {
    email: "notregistered@gmail.com",
    password: "Test@1234",
    description: "Unregistered user"
  },
  {
    email: "expired@gmail.com",
    password: "Expired@999",
    description: "Expired account"
  },
  {
    email: "suspended@gmail.com",
    password: "Suspended@123",
    description: "Suspended account"
  }
];

// Edge case scenarios for validation testing
export const edgeCaseUsers: Record<string, EdgeCaseUser> = {
  emptyEmail: {
    email: "",
    password: "Qazwsx@123",
    description: "Empty email"
  },
  emptyPassword: {
    email: "amali.fernando@email.com",
    password: "",
    description: "Empty password"
  },
  bothEmpty: {
    email: "",
    password: "",
    description: "Both fields empty"
  },
  invalidEmailFormat: {
    email: "notanemail",
    password: "Qazwsx@123",
    description: "Invalid email format"
  },
  emailWithoutDomain: {
    email: "user@",
    password: "Qazwsx@123",
    description: "Email without domain"
  },
  emailWithoutAt: {
    email: "usergmail.com",
    password: "Qazwsx@123",
    description: "Email without @ symbol"
  },
  sqlInjection: {
    email: "admin'--@gmail.com",
    password: "' OR '1'='1",
    description: "SQL injection attempt"
  },
  xssAttempt: {
    email: "<script>alert('xss')</script>@gmail.com",
    password: "Pass@1234",
    description: "XSS injection attempt"
  },
  specialCharactersEmail: {
    email: "user!#$%@gmail.com",
    password: "Qazwsx@123",
    description: "Special characters in email"
  },
  veryLongEmail: {
    email: "a".repeat(100) + "@gmail.com",
    password: "Qazwsx@123",
    description: "Very long email"
  },
  veryLongPassword: {
    email: "user@gmail.com",
    password: "P@ssw0rd" + "x".repeat(100),
    description: "Very long password"
  },
  shortPassword: {
    email: "user@gmail.com",
    password: "123",
    description: "Password too short"
  },
  passwordWithSpaces: {
    email: "user@gmail.com",
    password: "Pass @1234",
    description: "Password with spaces"
  },
  emailWithSpaces: {
    email: " user@gmail.com ",
    password: "Pass@1234",
    description: "Email with leading/trailing spaces"
  }
};

// Helper function to get a specific user type
// export const getUser = (type: 'valid' | 'invalid' | 'admin' | 'premium'): UserCredentials | undefined => {
//   switch(type) {
//     case 'admin':
//       return validUsers.find(u => u.description.includes('Admin'));
//     case 'premium':
//       return validUsers.find(u => u.description.includes('Premium'));
//     case 'valid':
//       return validUsers[0];
//     case 'invalid':
//       return invalidUsers[0];
//     default:
//       return validUsers[0];
//   }
// };

// Helper function to get random valid user
export const getRandomValidUser = (): UserCredentials => {
  const randomIndex = Math.floor(Math.random() * validUsers.length);
  return validUsers[randomIndex];
};

// Helper function to get random invalid user
export const getRandomInvalidUser = (): UserCredentials => {
  const randomIndex = Math.floor(Math.random() * invalidUsers.length);
  return invalidUsers[randomIndex];
};

// Helper function to get all edge case users as array
export const getAllEdgeCases = (): EdgeCaseUser[] => {
  return Object.values(edgeCaseUsers);
};

// Helper function to get specific edge case
export const getEdgeCase = (key: keyof typeof edgeCaseUsers): EdgeCaseUser => {
  return edgeCaseUsers[key];
};