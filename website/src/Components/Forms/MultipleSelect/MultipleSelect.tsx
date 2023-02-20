import { FC, useEffect, useRef, useState } from "react";
import { ArrowProps, SelectProps } from "./_types";
import { useFormContext } from "react-hook-form";
import { CheckboxSquared, useClickOutside } from "@lukasbriza/lbui-lib";
import clsx from "clsx";
import { selectShowAnimation } from "@animations";

export const MultipleSelect: FC<SelectProps> = (props) => {
  const { label, options, name } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);
  const { outside } = useClickOutside(ref);
  const methods = useFormContext();

  useEffect(() => {
    open && setHovered(true);
    ref.current && open && selectShowAnimation(ref.current);
  }, [open]);

  useEffect(() => {
    outside && setOpen(false);
    outside && setHovered(false);
  }, [outside]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCheckboxClick = (e: React.BaseSyntheticEvent, code: string) => {
    const fieldValue: string[] = methods.getValues(name);

    if (e.target.checked === true) {
      fieldValue.push(code);
      methods.setValue(name, fieldValue);
      return;
    }
    const filteredArray = fieldValue.filter((value) => value !== code);
    methods.setValue(name, filteredArray);
    return;
  };

  const handleMouseLeave = () => !open && setHovered(false);
  const handleMouseEnter = () => !open && setHovered(true);

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
        {options.map((option, i) => {
          return (
            <div className={"optionWrapper"} key={i + "t"}>
              <CheckboxSquared
                onChange={(e) => handleCheckboxClick(e, option.code)}
                label={option.name}
                name={option.code}
                className={"optionCheckboxRoot"}
                checkboxClass={"multipleOptionInputWrapper"}
                labelClass={"multipleOptionLabel"}
                checkerClass={"multipleOptionChecker"}
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
