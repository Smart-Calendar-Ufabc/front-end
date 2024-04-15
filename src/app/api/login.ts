import { USER_BASE_API } from '@/config'

interface LoginResponse {
  message?: string
  token?: string
  errors?: {
    email?: string[]
    password?: string[]
  }
}

export const loginFetch = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const response = await fetch(`${USER_BASE_API}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = (await response.json()) as LoginResponse

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
