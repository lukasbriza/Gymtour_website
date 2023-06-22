export type LoginFormValues = {
  username: string;
  password: string;
};

export type LoginFormProps = {
  toChange: () => void;
  toRegister: () => void;
};

export type ChangeFormProps = {
  toLogin: () => void;
  toRegister: () => void;
};

export type RegisterFormProps = {
  toLogin: () => void;
  toChange: () => void;
};

export type ForgetPasswordFormValues = {};
