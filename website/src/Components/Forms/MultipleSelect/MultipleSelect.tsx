import { BaseSyntheticEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { ArrowProps, MultipleSelectWithHelperProps, SelectProps } from "./_types";
import { useFormContext } from "react-hook-form";
import { CheckboxSquared, HelperText, useClickOutside } from "@lukasbriza/lbui-lib";
import clsx from "clsx";
import { selectShowAnimation } from "src/animations/_index";

export const MultipleSelect: FC<SelectProps> = (props) => {
  const { label, options, name, checkboxClick, syncWithWatch = false, defaultValue } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);
  const { outside } = useClickOutside(ref);
  const { getValues, setValue, watch } = useFormContext();
  const watchedValue: string[] = watch(name)

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCheckboxClick = useCallback((checked: boolean, code: string, boxName: string) => {
    const fieldValue: string[] = getValues(name);

    checkboxClick?.(checked, `${code}-${name}`, boxName, name)

    if (checked === true && fieldValue.includes(code)) {
      return
    }


    if (checked === true) {
      fieldValue.push(code);
      setValue(name, fieldValue);
      return;
    }
    const filteredArray = fieldValue.filter((value) => value !== code);
    setValue(name, filteredArray);

    return;
  }, [checkboxClick, getValues, name, setValue]);

  const handleMouseLeave = () => !open && setHovered(false);
  const handleMouseEnter = () => !open && setHovered(true);

  useEffect(() => {
    defaultValue?.forEach((value) => {
      handleCheckboxClick(true, value.code, value.name)
    })
  }, [defaultValue, handleCheckboxClick])

  useEffect(() => {
    open && setHovered(true);
    ref.current && open && selectShowAnimation(ref.current);
  }, [open]);

  useEffect(() => {
    outside && setOpen(false);
    outside && setHovered(false);
  }, [outside]);

  return (
    <div
      className={"selectAllWrapper"}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx([
          "selectWrapper",
          open && "selectCornerSharp",
          hovered && "selectWrapperHovered",
        ])}
        onClick={handleClick}
      >
        <div className={"selectLabel"}>
          <p>{label}</p>
          <div className={"selectLine"}></div>
          <Arrow className={clsx([hovered && "arrowWrapperHover"])} />
        </div>
      </div>
      <div className={clsx(["optionsWrapper", open && "show"])}>
        {options.length > 0 && options.map((option, i) => {
          const sync = syncWithWatch ? { checked: watchedValue.includes(option.code) } : {}
          const defaultChecked = defaultValue?.find((value) => value.code === option.code)

          return (
            <div className={"optionWrapper"} key={i + "t"}>
              <CheckboxSquared
                {...sync}
                checked={defaultChecked ? true : false}
                onChange={(e: BaseSyntheticEvent) => handleCheckboxClick(e.target.checked, option.code, option.name)}
                label={option.name}
                name={option.code}
                styleClass={{
                  root: "optionCheckboxRoot",
                  checkBox: "multipleOptionInputWrapper",
                  text: "multipleOptionLabel",
                  checker: "multipleOptionChecker"
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Arrow: FC<ArrowProps> = (props) => {
  const { className } = props;
  return (
    <div className={clsx(["arrowWrapper", className])}>
      <div className={"line1"}></div>
      <div className={"line2"}></div>
    </div>
  );
};

export const MultipleSelectWithHelper: FC<MultipleSelectWithHelperProps> = (props) => {
  const { requiredStar = false, helperText = "", isError, errorText, className, helperClass, ...otherProps } = props

  return (
    <HelperText
      styleClass={{
        root: clsx(["stringInputHelperRoot", className]),
        text: clsx(["stringInputHelper", helperClass])
      }}
      position={"bottom"}
      text={helperText}
      errorText={errorText}
      isError={isError}
      show={true}
    >
      <MultipleSelect {...otherProps} />
      {requiredStar && <div className="requiredStar">*</div>}
    </HelperText>
  )
}
