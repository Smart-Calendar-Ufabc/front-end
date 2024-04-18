import { USER_BASE_API } from '@/config'
import { useAppStates } from '@/store/useAppStates'

interface UpdateOnboardingResponse {
  message?: string
}

export const updateOnboardingFetch = async () => {
  try {
    const token = useAppStates.getState().authToken
    const response = await fetch(`${USER_BASE_API}/onboarding`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({}),
    })

    const data = (await response.json()) as UpdateOnboardingResponse

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
