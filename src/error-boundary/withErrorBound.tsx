import React, { ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { postSlackApiWithError } from '../API/slack.api';
import ErrorFallBack from './ErrorFallBack';
// TypeError {
//   stack: 'TypeError: Cannot read properties of null (reading \'0\')\n' +
//     '    at ImgCard (http://localhost:3000/static/js/bundle.js:7598:20)\n' +
//     '    at renderWithHooks (http://localhost:3000/static/js/bundle.js:49075:22)\n' +
//     '    at mountIndeterminateComponent (http://localhost:3000/static/js/bundle.js:52359:17)\n' +
//     '    at beginWork (http://localhost:3000/static/js/bundle.js:53655:20)\n' +
//     '    at beginWork$1 (http://localhost:3000/static/js/bundle.js:58614:18)\n' +
//     '    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:57884:16)\n' +
//     '    at workLoopSync (http://localhost:3000/static/js/bundle.js:57807:9)\n' +
//     '    at renderRootSync (http://localhost:3000/static/js/bundle.js:57780:11)\n' +
//     '    at recoverFromConcurrentError (http://localhost:3000/static/js/bundle.js:57272:24)\n' +
//     '    at performSyncWorkOnRoot (http://localhost:3000/static/js/bundle.js:57481:24)',
//   message: 'Cannot read properties of null (reading \'0\')'
// }
// info에서 나오는것, 컴포넌트 자체에서 렌더링이 일어날 때 나오는 에러 인포
// {
//   componentStack: '\n' +
//     '    at ImgCard (http://localhost:3000/static/js/bundle.js:7587:3)\n' +
//     '    at div\n' +
//     '    at div\n' +
//     '    at O (http://localhost:3000/static/js/bundle.js:69577:6)\n' +
//     '    at Sale (http://localhost:3000/static/js/bundle.js:7306:3)\n' +
//     '    at div\n' +
//     '    at O (http://localhost:3000/static/js/bundle.js:69577:6)\n' +
//     '    at main\n' +
//     '    at O (http://localhost:3000/static/js/bundle.js:69577:6)\n' +
//     '    at Goods (http://localhost:3000/static/js/bundle.js:6892:64)\n' +
//     '    at ErrorBoundary (http://localhost:3000/static/js/bundle.js:60784:5)\n' +
//     '    at Detail\n' +
//     '    at Suspense\n' +
//     '    at RenderedRoute (http://localhost:3000/static/js/bundle.js:63778:5)\n' +
//     '    at Outlet (http://localhost:3000/static/js/bundle.js:64382:26)\n' +
//     '    at div\n' +
//     '    at O (http://localhost:3000/static/js/bundle.js:69577:6)\n' +
//     '    at ErrorBoundary (http://localhost:3000/static/js/bundle.js:60784:5)\n' +
//     '    at Layout\n' +
//     '    at RenderedRoute (http://localhost:3000/static/js/bundle.js:63778:5)\n' +
//     '    at Routes (http://localhost:3000/static/js/bundle.js:64469:5)\n' +
//     '    at Router (http://localhost:3000/static/js/bundle.js:64403:15)\n' +
//     '    at BrowserRouter (http://localhost:3000/static/js/bundle.js:62383:5)\n' +
//     '    at Router\n' +
//     '    at tt (http://localhost:3000/static/js/bundle.js:69495:56)\n' +
//     '    at QueryClientProvider (http://localhost:3000/static/js/bundle.js:77569:3)\n' +
//     '    at App'
// }
// 05:44:34.447 | +13 sec
// {
//   componentStack: '\n' +
//     '    at ImgCard (http://localhost:3000/static/js/bundle.js:7587:3)\n' +
//     '    at div\n' +
//     '    at div\n' +
//     '    at O (http://localhost:3000/static/js/bundle.js:69577:6)\n' +
//     '    at Sale (http://localhost:3000/static/js/bundle.js:7306:3)\n' +
//     '    at div\n' +
//     '    at O (http://localhost:3000/static/js/bundle.js:69577:6)\n' +
//     '    at main\n' +
//     '    at O (http://localhost:3000/static/js/bundle.js:69577:6)\n' +
//     '    at Goods (http://localhost:3000/static/js/bundle.js:6892:64)\n' +
//     '    at ErrorBoundary (http://localhost:3000/static/js/bundle.js:60784:5)\n' +
//     '    at Detail\n' +
//     '    at Suspense\n' +
//     '    at RenderedRoute (http://localhost:3000/static/js/bundle.js:63778:5)\n' +
//     '    at Outlet (http://localhost:3000/static/js/bundle.js:64382:26)\n' +
//     '    at div\n' +
//     '    at O (http://localhost:3000/static/js/bundle.js:69577:6)\n' +
//     '    at ErrorBoundary (http://localhost:3000/static/js/bundle.js:60784:5)\n' +
//     '    at Layout\n' +
//     '    at RenderedRoute (http://localhost:3000/static/js/bundle.js:63778:5)\n' +
//     '    at Routes (http://localhost:3000/static/js/bundle.js:64469:5)\n' +
//     '    at Router (http://localhost:3000/static/js/bundle.js:64403:15)\n' +
//     '    at BrowserRouter (http://localhost:3000/static/js/bundle.js:62383:5)\n' +
//     '    at Router\n' +
//     '    at tt (http://localhost:3000/static/js/bundle.js:69495:56)\n' +
//     '    at QueryClientProvider (http://localhost:3000/static/js/bundle.js:77569:3)\n' +
//     '    at App'
// }
const withErrorBound = (component: React.ReactNode) => {
  if (component) {
    //     console.log(component.type['name']);
  }
  return (
    <ErrorBoundary onReset={(error) => {}} onError={logError} FallbackComponent={ErrorFallBack}>
      {component}
    </ErrorBoundary>
  );
};

const logError = async (error: Error, info: ErrorInfo) => {
  console.log(info); // info(객체) 에 {componentStack}이 있는데 에러가 발생한 컴포넌트의 stack을 나타냅니다. componentStack의 타입은 string
  console.log(error);
  await postSlackApiWithError(error, info);
};

// // Error boundary 컴포넌트의 FallbackComponent
// // resetErrorBoundary라는 property는 결국 onReset이라는 ErrorBoundary의 속성값과 일치합니다.
// const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
//   //const { resetBoundary, showBoundary } = useErrorBoundary(); // 비동기 error를 잡을 때 catch 부분에서 사용합니다.
//   // resetErrorBoundary('???????') - onReset의 인자 값으로 error 안에'???????'이 들어있습니다.
//   console.log(error);
//   return (
//     <div role="alert" style={{ display: 'grid', minHeight: '100vh', minWidth: '100vw', placeContent: 'center' }}>
//       <Div>
//         <p>Something went wrong:</p>
//         <pre style={{ color: 'red' }}>{error.message}</pre>
//         <button onClick={() => resetErrorBoundary(error)}>재시도</button>
//       </Div>
//     </div>
//   );
// };

// const Div = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   font-size: 2.4rem;
// `;
export default withErrorBound;
