import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type values = Record<string, string>;

export const useInput = (initialValue: values) => {
  const params = useParams();
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email);

  // 유효성 검사
  const validateInputs = useCallback(() => {
    if (params.auth === 'signup') {
      const isPasswordMatch = value.password === value.passwordCheck;
      const areFieldsFilled =
        value.email.trim() !== '' &&
        value.password.trim() !== '' &&
        value.passwordCheck.trim() !== '' &&
        value.nickname.trim() !== '';

      setEmailErrorMessage(value.email.trim() !== '' && !isEmailValid ? '올바른 이메일 형식이 아닙니다.' : '');
      setPasswordErrorMessage(value.password.trim() !== '' && !isPasswordMatch ? '비밀번호가 일치하지 않습니다.' : '');

      setIsValid(isEmailValid && isPasswordMatch && areFieldsFilled);
    } else {
      const areFieldsFilled = value.email.trim() !== '' && value.password.trim() !== '';
      setIsValid(isEmailValid && areFieldsFilled);
      setEmailErrorMessage(value.email.trim() !== '' && !isEmailValid ? '올바른 이메일 형식이 아닙니다.' : '');
    }
  }, [isEmailValid, params.auth, value.email, value.nickname, value.password, value.passwordCheck]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
    validateInputs();
  };

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  useEffect(() => {
    validateInputs();
  }, [validateInputs]);

  return { value, onChange, reset, isValid, emailErrorMessage, passwordErrorMessage };
};
