import { apiConfig } from "./config/index"

export const credentials = {
  installed: {
    client_id: apiConfig.google_cl_id,
    project_id: apiConfig.google_project_id,
    auth_uri: apiConfig.google_auth_uri,
    token_uri: apiConfig.google_token_uri,
    auth_provider_x509_cert_url: apiConfig.google_auth_provider_cert_url,
    client_secret: apiConfig.google_cl_secret,
    redirect_uris: apiConfig.google_redirect_uris,
  },
}
