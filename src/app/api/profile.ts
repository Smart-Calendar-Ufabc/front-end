import { USER_BASE_API } from '@/config'
import { fileToBase64 } from '@/helpers/file'
import { useAppStates } from '@/store/useAppStates'

interface GetProfileResponse {
  message?: string
  profile?: {
    name: string
    avatar_image_url: string
    sleepHours?: {
      start: {
        hour: number
        minutes: number
      }
      end: {
        hour: number
        minutes: number
      }
    }
  }
}

export const getProfileFetch = async () => {
  try {
    const token = useAppStates.getState().authToken
    const response = await fetch(`${USER_BASE_API}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })

    const data = (await response.json()) as GetProfileResponse

    return {
      data: {
        profile: data.profile
          ? {
              ...data.profile,
              avatarUrl: data.profile?.avatar_image_url,
            }
          : undefined,
      },
      status: response.status,
    }
  } catch (error) {
    return {
      message: 'Internal server error',
      status: 500,
    }
  }
}

interface CreateProfileResponse {
  message?: string
  profile?: {
    name: string
    avatar_image_url?: string
    sleepHours?: {
      start: {
        hour: number
        minutes: number
      }
      end: {
        hour: number
        minutes: number
      }
    }
  }
}

export const createProfileFetch = async ({
  name,
  avatar,
  sleepHours,
}: {
  name?: string
  avatar?: File
  sleepHours?: {
    start: {
      hour: number
      minutes: number
    }
    end: {
      hour: number
      minutes: number
    }
  }
}) => {
  try {
    const token = useAppStates.getState().authToken
    let avatarBase64: string | undefined
    if (avatar) {
      avatarBase64 = await fileToBase64(avatar)
    }
    const response = await fetch(`${USER_BASE_API}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        name,
        sleepHours,
        avatar: avatarBase64,
      }),
    })

    const data = (await response.json()) as CreateProfileResponse

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

interface UpdateProfileResponse {
  message?: string
  profile?: {
    name: string
    avatar_image_url?: string
    sleepHours?: {
      start: {
        hour: number
        minutes: number
      }
      end: {
        hour: number
        minutes: number
      }
    }
  }
}

export const updateProfileFetch = async ({
  name,
  sleepHours,
  avatar,
}: {
  name?: string
  avatar?: File
  sleepHours?: {
    start: {
      hour: number
      minutes: number
    }
    end: {
      hour: number
      minutes: number
    }
  }
}) => {
  try {
    const token = useAppStates.getState().authToken
    let avatarBase64: string | undefined
    if (avatar) {
      avatarBase64 = await fileToBase64(avatar)
    }
    const response = await fetch(`${USER_BASE_API}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        name,
        sleepHours,
        avatar: avatarBase64,
      }),
    })

    const data = (await response.json()) as UpdateProfileResponse

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
