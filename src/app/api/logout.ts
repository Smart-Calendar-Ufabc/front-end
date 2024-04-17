import { USER_BASE_API } from '@/config'
import { useAppStates } from '@/store/useAppStates'

interface LogoutResponse {
  message?: string
}

export const logoutFetch = async () => {
  const token = useAppStates.getState().authToken
  try {
    const response = await fetch(`${USER_BASE_API}/sessions`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })

    const data = (await response.json()) as LogoutResponse

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
