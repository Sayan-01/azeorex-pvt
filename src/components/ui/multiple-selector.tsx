"use client";

import { Badge } from "@/components/ui/badge";
import { Command, CommandItem, CommandEmpty, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import React, { KeyboardEvent, createContext, forwardRef, useCallback, useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

type MultiSelectorProps = {
  values: string[];
  onValueChange: (values: string[]) => void;
  loop?: boolean;
  className?: string;
  children: React.ReactNode;
  dir?: "ltr" | "rtl";
};



const MultiSelectContext = createContext<any>(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider");
  }
  return context;
};

const MultiSelector = ({ values: value, onValueChange: onChange, loop = false, className, children, dir, ...props }:any) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const onValueChangeHandler = useCallback(
    (val:string) => {
      if (value.includes(val)) {
        onChange(value.filter((item:string) => item !== val));
      } else {
        onChange([...value, val]);
      }
    },
    [value]
  );

  const handleKeyDown = useCallback(
    (e:React.KeyboardEvent) => {
      const moveNext = () => {
        const nextIndex = activeIndex + 1;
        setActiveIndex(nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex);
      };

      const movePrev = () => {
        const prevIndex = activeIndex - 1;
        setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
      };

      switch (e.key) {
        case "Backspace":
        case "Delete":
          if (value.length > 0 && inputValue.length === 0) {
            if (activeIndex !== -1 && activeIndex < value.length) {
              onChange(value.filter((item:string) => item !== value[activeIndex]));
              const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
              setActiveIndex(newIndex);
            } else {
              onChange(value.filter((item:string) => item !== value[value.length - 1]));
            }
          }
          break;
        case "Enter":
          setOpen(true);
          break;
        case "Escape":
          if (activeIndex !== -1) {
            setActiveIndex(-1);
          } else {
            setOpen(false);
          }
          break;
        case "ArrowRight":
          if (dir === "rtl") {
            movePrev();
          } else if (activeIndex !== -1 || loop) {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (dir === "rtl") {
            moveNext();
          } else {
            movePrev();
          }
          break;
      }
    },
    [value, inputValue, activeIndex, loop]
  );

  return (
    <MultiSelectContext.Provider
      value={{
        value,
        onChange: onValueChangeHandler,
        open,
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
      }}
    >
      <Command
        onKeyDown={handleKeyDown}
        className={cn("overflow-visible bg-transparent flex flex-col space-y-2", className)}
        dir={dir}
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorTrigger = forwardRef(({ className, children, ...props }:any, ref) => {
  const { value, onChange, activeIndex } = useMultiSelect();

  const mousePreventDefault = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("flex !-mt-0.5 !mb-2 flex-wrap gap-x-2 gap-y-2 px-2 py-1.5  border  rounded-lg bg-zinc-800 ", className)}
      {...props}
    >
      {value.map((item:any, index:number) => (
        <Badge
          key={item}
          className={cn("px-3 rounded-xl flex items-center gap-1 bg-zinc-900 py-1.5", activeIndex === index && "ring-2 ring-muted-foreground ")}
          variant={"secondary"}
        >
          <span className="text-xs">{item}</span>
          <button
            aria-label={`Remove ${item} option`}
            aria-roledescription="button to remove option"
            type="button"
            onMouseDown={mousePreventDefault}
            onClick={() => onChange(item)}
          >
            <span className="sr-only">Remove {item} option</span>
            <IoMdClose className="h-4 w-4 hover:stroke-destructive" />
          </button>
        </Badge>
      ))}
      {children}
    </div>
  );
});

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = forwardRef(({ className, ...props }:any, ref) => {
  const { setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } = useMultiSelect();

  return (
    <CommandPrimitive.Input
      {...props}
      ref={ref}
      value={inputValue}
      onChange={activeIndex === -1 ? setInputValue : undefined}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onClick={() => setActiveIndex(-1)}
      className={`
        bg-transparent outline-none placeholder:text-muted-foreground w-full
        ${className} ${activeIndex !== -1 ? "caret-transparent" : ""}
      `}
    />
  );
});

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef(({ children, ...props }:any, ref) => {
  const { open } = useMultiSelect();

  return (
    <div
      ref={ref}
      className="relative"
      {...props}
    >
      {open && children}
    </div>
  );
});

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef(({ className, children, ...props }:any, ref) => {
  return (
    <CommandList
      ref={ref}
      className={`
        p-2 flex flex-col box gap-2 rounded-md scrollbar-thin scrollbar-track-transparent transition-colors scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg w-full absolute bg-zinc-800 shadow-md z-10 border top-0
        ${className}
      `}
      {...props}
    >
      {children}
      <CommandEmpty>
        <span className="text-muted-foreground">No results found</span>
      </CommandEmpty>
    </CommandList>
  );
});

MultiSelectorList.displayName = "MultiSelectorList";

const MultiSelectorItem = forwardRef(({ className, value, children, ...props }:any, ref) => {
  const { value: Options, onChange, setInputValue } = useMultiSelect();

  const mousePreventDefault = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const isIncluded = Options.includes(value);
  return (
    <CommandItem
      ref={ref}
      {...props}
      onSelect={() => {
        onChange(value);
        setInputValue("");
      }}
      className={cn(
        "rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between hover:bg-zinc-900",
        className,
        isIncluded && "opacity-50 cursor-default",
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
      onMouseDown={mousePreventDefault}
    >
      {children}
      {isIncluded && <IoMdCheckmark className="h-4 w-4" />}
    </CommandItem>
  );
});

MultiSelectorItem.displayName = "MultiSelectorItem";

export { MultiSelector, MultiSelectorTrigger, MultiSelectorInput, MultiSelectorContent, MultiSelectorList, MultiSelectorItem };
