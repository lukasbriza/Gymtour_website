import { ChangeEvent, forwardRef, useState } from "react";
import { TextAreaProps } from "./_types";
import clsx from "clsx";
import { HelperText } from "@lukasbriza/lbui-lib";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    requiredStar = false,
    name,
    rows = 10,
    cols = 30,
    helperRootClass,
    helperClass,
    className,
    helperText = "",
    label,
    errorText,
    show = true,
    isError,
    resize = false,
    onChange,
    onBlur,
    defaultValue,
    ...otherProps
  } = props;
  const [focused, setFocused] = useState<boolean>();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
  };
  return (
    <HelperText
      styleClass={{
        root: clsx(["stringInputHelperRoot", helperRootClass]),
        text: clsx(["stringInputHelper", helperClass])
      }}
      position={"bottom"}
      text={helperText}
      errorText={errorText}
      isError={isError}
      show={show}
    >
      <textarea
        ref={ref}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          onBlur?.(e);
          setFocused(false);
        }}
        onChange={handleChange}
        name={name}
        cols={cols}
        rows={rows}
        className={clsx([
          "textAreaInput",
          focused && "textAreaInputActive",
          !resize && "disableResize",
          isError && "textAreaError",
          className,
        ])}
        placeholder={label}
        {...otherProps}
      />
      {requiredStar && <div className="requiredStar">*</div>}
    </HelperText>
  );
});
