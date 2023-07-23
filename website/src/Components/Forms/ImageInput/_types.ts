import { Noop } from "react-hook-form";

export type ImageInputProps = {
  id?: string;
  onBlur?: Noop;
  className?: string;
  value?: any;
  name: string;
  allowedFileTypes?: string;
  showPreview?: boolean;
  tooltipPlace?: "top" | "left" | "right" | "bottom";
  onStart?: () => void;
  onSuccess?: (file: File) => void;
  onUnsupportedFileType?: () => void;
  onNoFile?: () => void;
  onChange?: (file: File) => void;
  onFileRemove?: (file: File) => void;
};

export type ImperativeImageInput = {
  current: HTMLInputElement | null;
  file: File | null;
  removeFile: () => void;
};

export type ImagePreviewProps = {
  handleClose: () => void;
  url: string | null | ArrayBuffer;
  open?: boolean;
};

export type MultipleImageInputProps = {
  name: string;
  onBlur: Noop;
  value?: File[];
  onChange?: (files: File[]) => void;
  className?: string;
};

export type ImperativeMultipleImageInput = {
  current: HTMLInputElement | null;
};
