import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { cn } from '@/helpers/util';

export interface Rule {
  rule: 'required' | 'email' | 'minLength';
  message?: string;
  value?: number;
}

export interface InputProps {
  rules?: Rule[];
  id: string;
  placeholder?: string;
  label?: string;
  className?: string;
  onChange?: (value: string) => void;
  validateForm?: boolean;
  type?: string;
  errorMessage?: string | null;
}

export interface FormItemRef {
  validate: () => string | null;
}

const Input = forwardRef<FormItemRef, InputProps>((props, ref) => {
  const { rules, id, placeholder, label, className, onChange, ...rest } = props;
  const [value, setValue] = useState<string>('');
  const [valueChanged, setValueChanged] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): string | null => {
    let errorMessage = null;
    if (!rules) return null;
    for (const rule of rules) {
      let validationResult;

      switch (rule.rule) {
        case 'required':
          validationResult = validateRequired(value, rule);
          break;

        case 'email':
          validationResult = validateEmail(value, rule);
          break;

        case 'minLength':
          validationResult = validateMinLength(value, rule);
          break;

        default:
          validationResult = null;
          break;
      }

      if (validationResult) {
        errorMessage = validationResult;
        break;
      }
    }

    setErrorMessage(errorMessage);
    return errorMessage;
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  useEffect(() => {
    if (valueChanged) validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, rules]);

  const validateRequired = (value: string, rule: Rule): string | null => {
    if (value === '') return rule.message ?? 'This field is required!';
    return null;
  };

  const validateEmail = (value: string, rule: Rule): string | null => {
    if (value && !/\S+@\S+\.\S+/.test(value)) return rule.message ?? 'Invalid email address!';
    return null;
  };

  const validateMinLength = (value: string, rule: Rule): string | null => {
    if (value && value.length < (rule.value ?? 0)) return rule.message ?? 'Input is too short!';
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setValueChanged(true);
    if (onChange) onChange(e.target.value);
  };

  return (
    <>
      {props.type != 'hidden' && (
        <label
          htmlFor={id}
          className={cn('mb-1 text-sm font-semibold text-gray-700 dark:text-white flex gap-1', {
            'text-red-400': errorMessage,
          })}
        >
          {label}
          {rules?.find((x) => x.rule == 'required') && <div className="text-red-400">*</div>}
        </label>
      )}
      <div className="font-medium flex flex-col">
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
          className={cn(
            'w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white',
            className
          )}
          {...rest}
        />
        {errorMessage && <span className="text-red-400 text-[12px]">{errorMessage}</span>}
      </div>
    </>
  );
});

export default Input;
