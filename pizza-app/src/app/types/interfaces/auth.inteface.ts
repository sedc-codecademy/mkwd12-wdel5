export interface Login {
  username: string
  password: string
}

export interface Register extends Login {
  email: string
}

export interface LoginResponse {
  errors: [];
  isSuccessful: boolean;
  result: {
    token: string
    validTo: string
  }
}