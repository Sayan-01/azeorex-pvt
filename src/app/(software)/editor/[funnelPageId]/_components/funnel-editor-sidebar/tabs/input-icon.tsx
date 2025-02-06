import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const InputIcon: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="w-[98%] rounded-[5px] bg-[#373737]"
      style={{ padding: "4px 2px 0px 2px", height: "30px" }}
    >
      <div className="icons flex justify-between gap-3">
        {children}
        <i className="text-[#fff] w-6 h-6" style={{ padding: '4px' }} />
      </div>
    </div>
  );
};

export default InputIcon;
