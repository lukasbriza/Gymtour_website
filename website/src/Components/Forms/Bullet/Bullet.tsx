import clsx from "clsx";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BulletProps } from "./_type";

export const Bullet: FC<BulletProps> = (props) => {
  const { name, value } = props;
  const { register } = useFormContext();
  const [active, setActive] = useState<boolean>(false);
  const handleActive = () => setActive(!active);

  return (
    <div className={clsx(["bulletWrapper", active && "bulletActiweWrapper"])}>
      <input type="checkbox" {...register(name)} onClick={handleActive} />
      <div className={"bulletText"}>{value}</div>
    </div>
  );
};
