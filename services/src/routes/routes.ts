export const pathRoot = {
  v1: {
    auth: {
      login: "/api/v1/auth/login",
      register: "/api/v1/auth/register",
      logout: "/api/v1/auth/logout",
      resetPass: "/api/v1/auth/resetPass/:email",
      me: "/api/v1/auth/me",
    },
    user: "/api/v1/user",
    users: {
      base: "/api/v1/users",
      me: "/api/v1/users/me",
    },
    tokens: {
      validate: "/api/v1/tokens/validate",
    },
    stripe: {
      create_session: "/api/v1/stripe/create-session",
      create_pricess: "/api/v1/stripe/create_prices",
      retrieve_session: "/api/v1/stripe/retrieve-session/:id",
    },
    google: {
      sheets: "/api/v1/google/sheets",
    },
  },
}
