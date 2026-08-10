export type SignupState = {
  errors:
    | {
        name?:
          | {
              errors: string[]
            }
          | undefined
        email?:
          | {
              errors: string[]
            }
          | undefined
        username?:
          | {
              errors: string[]
            }
          | undefined
        password?:
          | {
              errors: string[]
            }
          | undefined
        confirmPassword?:
          | {
              errors: string[]
            }
          | undefined
        general?:
          | {
              errors: string[]
            }
          | undefined
      }
    | undefined
  values: {
    name: string
    email: string
    username: string
    password: string
    confirmPassword: string
  }
}
