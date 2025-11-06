export interface UserCredentials {
  description: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface EdgeCaseUser {
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  email: string;
  password: string;
}

export const validUsers = [
  {
    description: "a valid user with all fields",
    firstName: "Alice",
    lastName: "Johnson",
    address: "123 Maple St",
    city: "Metropolis",
    email: "alice.johnson3@example.com",
    phoneNo: "0763456789",
    password: "ValidPassword123",
    confirmPassword: "ValidPassword123",
  },
];
export const invalidUsers = [
  {
    description: "an invalid user with wrong password",
    firstName: "Jane",
    lastName: "Smith",
    address: "456 Elm St",
    city: "Gotham",
    email: "invaliduser@example.com",
    phoneNo: "0763463464",
    password: "WrongPassword123",
    confirmPassword: "WrongPassword123",
  },
];

export const edgeCaseUsers = {
  emptyEmail: {
    email: "",
    password: "ValidPassword123",
  },
  shortPassword: {
    email: "shortpassword@example.com",
    password: "Short1",
  },
};
