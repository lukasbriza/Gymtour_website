export type RegisterFormValues = {
  name: string;
  password: string;
  email: string;
  terms: boolean;
  dataProcessing: boolean;
};

export type RegistrationFormProps = {
  buttonText?: string;
  clearAfterSubmit?: boolean;
  formClassName?: string;
  onErrorModal?: () => void;
  onSuccessModal?: () => void;
};
