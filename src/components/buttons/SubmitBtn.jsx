"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiLoader2Line } from "react-icons/ri";

export function SubmitButton({ className, variant, size, loading, children, disable_className, disabled }) {
  return (
    <>
      {loading ? (
        <Button
          disabled
          className={cn("w-fit flex items-center", disable_className)}
          variant={variant}
          size={size}
        >
          <RiLoader2Line className="mr-2 size-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          className={cn("w-fit", className)}
          variant={variant}
          size={size}
          type="submit"
          disabled={disabled}
        >
          {children}
        </Button>
      )}
    </>
  );
}
