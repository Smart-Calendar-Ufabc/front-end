import { USER_BASE_API } from '@/config'

interface SignUpResponse {
  message?: string
  errors?: {
    email?: string[]
    password?: string[]
  }
}

export const signUpFetch = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const response = await fetch(`${USER_BASE_API}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = (await response.json()) as SignUpResponse

    return {
      data,
      status: response.status,
    }
  } catch (error) {
    return {
      message: 'Internal server error',
      status: 500,
    }
  }
}

interface SignUpCodeValidationResponse {
  message?: string
  token?: string
  errors?: {
    email?: string[]
    code?: string[]
  }
}

export const signUpCodeValidationFetch = async ({
  email,
  code,
}: {
  email: string
  code: string
}) => {
  try {
    const response = await fetch(`${USER_BASE_API}/sign-up/code-validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    })

    const data = (await response.json()) as SignUpCodeValidationResponse

    return {
      data,
      status: response.status,
    }
  } catch (error) {
    return {
      message: 'Internal server error',
      status: 500,
    }
  }
}
