// import * as React from "react";

// import { cn } from "@/lib/utils";

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
//   return (
//     <input
//       type={type}
//       className={cn(
//         "flex h-[30px] mt-2 w-full rounded-lg border-2 hover:border-[#6A6A6A] bg-[#272727] px-2 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:border-[#726FFF]  disabled:cursor-not-allowed disabled:opacity-50 ",
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   );
// });
// Input.displayName = "Input";

// export { Input };

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, children, type, ...props }, ref) => {
  return (
    <label className={cn("mt- w-full h-[30px] flex rounded-md border-2 shadow-sm hover:border-[#6A6A6A] transition-colors overflow-hidden", "focus-within:!border-[#726FFF]")}>
      {children && <div className="h-full w-12 flex items-center justify-center text-xs text-muted-foreground bg-[#272727]">{children}</div>}

      <input
        autoComplete="off"
        type={type}
        className={cn(
          "flex h-full w-full bg-[#272727] pr-2 py-1 text-xs outline-none border-none disabled:cursor-not-allowed disabled:opacity-50 file:bg-transparent  file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground caret-[#a1a1aa]/80 caret",
          className,
          {
            "pl-2": !children,
          }
        )}
        ref={ref}
        {...props}
      />
    </label>
  );
});
Input.displayName = "Input";

export { Input };

