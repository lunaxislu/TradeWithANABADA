import { FallbackProps } from 'react-error-boundary';
import * as St from './withErrorBound.styled';

const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <St.ErrorUi>
      <St.Wrapper>
        <div>asd</div>
      </St.Wrapper>
    </St.ErrorUi>
  );
};

export default ErrorFallBack;
