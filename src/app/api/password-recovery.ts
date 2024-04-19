import { USER_BASE_API } from '@/config'

interface PasswordRecoverySendCodeValidationResponse {
  message?: string
  errors?: {
    email?: string[]
  }
}

export const passwordRecoverySendCodeFetch = async ({
  email,
}: {
  email: string
}) => {
  try {
    const response = await fetch(
      `${USER_BASE_API}/password-recovery/send-code`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      },
    )

    const data =
      (await response.json()) as PasswordRecoverySendCodeValidationResponse

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

interface PasswordRecoveryConfirmValidationResponse {
  token?: string
  message?: string
  errors?: {
    email?: string[]
    code?: string[]
  }
}

export const passwordRecoveryConfirmCodeFetch = async ({
  email,
  code,
}: {
  email: string
  code: string
}) => {
  try {
    const response = await fetch(
      `${USER_BASE_API}/password-recovery/confirm-code`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      },
    )

    const data =
      (await response.json()) as PasswordRecoveryConfirmValidationResponse

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

interface PasswordRecoveryUpdatePasswordResponse {
  message?: string
  errors?: {
    newPassword?: string[]
    confirmPassword?: string[]
  }
}

export const passwordRecoveryUpdatePasswordFetch = async ({
  newPassword,
  confirmPassword,
  token,
}: {
  newPassword: string
  confirmPassword: string
  token: string
}) => {
  try {
    const response = await fetch(
      `${USER_BASE_API}/password-recovery/update-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, confirmPassword, token }),
      },
    )

    const data =
      (await response.json()) as PasswordRecoveryUpdatePasswordResponse

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
