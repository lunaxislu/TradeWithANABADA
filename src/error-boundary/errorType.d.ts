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
