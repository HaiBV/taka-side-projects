import { ComponentProps } from "react";

const Button = (props: Omit<ComponentProps<"button">, "className"> & { className: number }) => {
  console.log(props);
  return <div>Button</div>;
};

export default Button;
