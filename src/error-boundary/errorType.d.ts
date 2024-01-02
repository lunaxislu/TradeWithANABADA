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

// AuthApiError {
//       __isAuthError: true,
//       name: 'AuthApiError',
//       status: 400,
//       stack: 'AuthApiError: Invalid login credentials\n' +
//         '    at handleError (http://localhost:3000/static/js/bundle.js:24360:9)\n' +
//         '    at async _handleRequest (http://localhost:3000/static/js/bundle.js:24407:5)\n' +
//         '    at async _request (http://localhost:3000/static/js/bundle.js:24387:16)\n' +
//         '    at async SupabaseAuthClient.signInWithPassword (http://localhost:3000/static/js/bundle.js:22026:15)\n' +
//         '    at async Object.loginHandler [as mutationFn] (http://localhost:3000/main.eef3372ecaa8aa638c6f.hot-update.js:204:7)',
//       message: 'Invalid login credentials'
//     }
