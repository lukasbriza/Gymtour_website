import clsx from "clsx";
import { FC, useEffect, useState, useRef } from "react";
import { ArrowProps, RegionSelectProps } from "./_types";
import { CheckboxSquared, useClickOutside } from "@lukasbriza/lbui-lib";
import { useFormContext } from "react-hook-form";
import { selectRegionShowAnimation } from "src/animations/_index";

export const MultipleRegionSelect: FC<RegionSelectProps> = (props) => {
  const { label, options, name, checkboxClick, syncWithWatch = false } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);
  const { outside } = useClickOutside(ref);
  const { getValues, setValue, watch } = useFormContext();
  const watchedValue: string[] = watch(name)

  useEffect(() => {
    open && setHovered(true);
    ref.current && open && selectRegionShowAnimation(ref.current);
  }, [open]);

  useEffect(() => {
    outside && setOpen(false);
    outside && setHovered(false);
  }, [outside]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleMouseLeave = () => !open && setHovered(false);
  const handleMouseEnter = () => !open && setHovered(true);

  const handleCheckboxClick = (e: React.BaseSyntheticEvent, code: string, boxName: string) => {
    const fieldValue: string[] = getValues(name);

    checkboxClick?.(e.target.checked, `${code}-${name}`, boxName, name)

    if (e.target.checked === true) {
      fieldValue.push(code);
      setValue(name, fieldValue);
      return;
    }

    const filteredArray = fieldValue.filter((value) => value !== code);
    setValue(name, filteredArray);
    return;
  };

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
          //ONLY FOR PILOT PROJECT
          if (i === 0) {
            return (
              <div className={"sectionWrapper"} key={i}>
                <div className={"optionHeader"}>{option.header}</div>
                {option.options.map((town, i) => {
                  const sync = syncWithWatch ? { checked: watchedValue.includes(town.code) } : {}
                  return (
                    <div className={"optionWrapper"} key={i + "t"}>
                      <CheckboxSquared
                        {...sync}
                        onChange={(e) => handleCheckboxClick(e, town.code, town.name)}
                        label={town.name}
                        name={town.code}
                        className={"optionCheckboxRoot"}
                        checkboxClass={"multipleOptionInputWrapper"}
                        labelClass={"multipleOptionLabel"}
                        checkerClass={"multipleOptionChecker"}
                      />
                    </div>
                  );
                })}
              </div>
            );
          }
          return null
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
