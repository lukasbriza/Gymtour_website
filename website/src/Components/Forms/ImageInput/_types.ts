import { FocusEvent } from "react";

export type ImageInputProps = {
  id?: string;
  className?: string;
  value?: File;
  name: string;
  allowedFileTypes?: string;
  showPreview?: boolean;
  tooltipPlace?: "top" | "left" | "right" | "bottom";
  errorText?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: File | undefined) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onStart?: () => void;
  onSuccess?: (file: File) => void;
  onUnsupportedFileType?: () => void;
  onNoFile?: () => void;
  onFileRemove?: (file: File) => void;
};

export type ImagePreviewProps = {
  handleClose: () => void;
  url: string | null | ArrayBuffer;
  open?: boolean;
};

export type MultipleImageInputProps = {
  name: string;
  onBlur: () => void;
  value?: File[];
  onChange?: (files: File[]) => void;
  className?: string;
};

export type ImperativeMultipleImageInput = {
  current: HTMLInputElement | null;
};
