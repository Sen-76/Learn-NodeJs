import React, { useRef, ReactNode, FormEvent } from 'react';
import { FormItemRef } from './Input';

interface FormProps {
  children: ReactNode;
  onFinish?: (formData: A) => void;
  id?: string;
  className?: string;
}

const Form = (props: FormProps) => {
  const { children, onFinish, id, ...rest } = props;
  const inputRefs = useRef<Record<string, FormItemRef>>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isFormValid = true;

    Object.values(inputRefs.current).forEach((inputRef) => {
      const errorMessage = inputRef?.validate ? inputRef.validate() : null;
      if (errorMessage) isFormValid = false;
    });

    if (!isFormValid) return;

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    onFinish?.(formObject);
  };

  const childrenWithRefs = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const test = React.cloneElement(child, {
        ref: (ref: FormItemRef) => (inputRefs.current[(child.props as { id: string }).id] = ref),
      } as React.Attributes);
      return test;
    }
    return child;
  });

  return (
    <form id={id} name={id} onSubmit={onSubmit} {...rest}>
      {childrenWithRefs}
    </form>
  );
};

export default Form;
