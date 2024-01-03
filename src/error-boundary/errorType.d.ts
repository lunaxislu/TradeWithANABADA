type AuthApiError = {
  _isAuthError: boolean;
  name: string;
  status: number;
  stack: string;
  message: string;
};
type PostgrestError = {
  message: string;
  details: string;
  hint: string;
  code: string;
};
type ErrorInComponent = {
  stack: string;
};

type ClientError = { error: 'invalid_mime_type'; message: 'mime type not supported'; statusCode: '422' };
