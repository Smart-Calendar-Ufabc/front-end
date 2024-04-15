export const USER_BASE_API =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333/users'
    : 'https://ease-calendar-user-worker.gisellehoekveld.workers.dev/users'
