"use server"

import z from "zod"
import { SignupSchema } from "@/lib/schemas/user"
import { auth } from "@/lib/auth"
import { isAPIError } from "better-auth/api"
import { redirect } from "next/navigation"
import { SignupState } from "@/lib/definitions"
import { getAuthErrorField } from "@/lib/utils"

export async function createUser(
  initialState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const values = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const validatedFields = SignupSchema.safeParse(values)

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)
    return {
      errors: tree.properties,
      values,
    }
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        username: validatedFields.data.username,
        password: validatedFields.data.password,
      },
    })
  } catch (error) {
    if (isAPIError(error)) {
      const field = getAuthErrorField(error)
      return {
        errors: {
          [field]: {
            errors: [error.message],
          },
        },
        values,
      }
    }
    throw error
  }
  redirect("/verify-email")
}
