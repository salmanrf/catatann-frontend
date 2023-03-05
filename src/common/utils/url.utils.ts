import { API_CONFIG } from '../configs/api.config';

export function getGoogleOAuthUrl(from: string) {
  const root_url = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: API_CONFIG.GOOGLE_OAUTH_REDIRECT,
    client_id: API_CONFIG.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'openid',
    ].join(' '),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${root_url}?${qs.toString()}`;
}
