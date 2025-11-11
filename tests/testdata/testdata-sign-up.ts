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
    email: "alice.johnson132@example.com",
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
    firstName: "Alice",
    lastName: "Johnson",
    address: "123 Maple St",
    city: "Metropolis",
    email: "",
    phoneNo: "0763456789",
    password: "ValidPassword123",
    confirmPassword: "ValidPassword123",
  },
  emptyPassword: {
    firstName: "Alice",
    lastName: "Johnson",
    address: "123 Maple St",
    city: "Metropolis",
    email: "",
    phoneNo: "0763456789",
    password: "",
    confirmPassword: "",
  },
  bothEmpty: {
    firstName: "Alice",
    lastName: "Johnson",
    address: "123 Maple St",
    city: "Metropolis",
    email: "",
    phoneNo: "0763456789",
    password: "",
    confirmPassword: "",
  },
  emptyphone: {
    firstName: "Alice",
    lastName: "Johnson",
    address: "123 Maple St",
    city: "Metropolis",
    email: "asflk@alfkj.com",
    phoneNo: "",
    password: "ValidPassword123",
    confirmPassword: "ValidPassword123",
  },
};
