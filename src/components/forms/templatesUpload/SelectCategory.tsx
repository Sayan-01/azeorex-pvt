import { MultiSelector, MultiSelectorTrigger, MultiSelectorInput, MultiSelectorContent, MultiSelectorList, MultiSelectorItem } from "@/components/ui/multiple-selector";
import { category } from "@/constants/azeorex-landing-page";

const MultiSelectTest = ({ value, onChange }: { value: string[]; onChange: (arg0: string[]) => void }) => {
  return (
    <MultiSelector
      values={value}
      onValueChange={onChange}
      loop={false}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select your framework" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {category.map((option, i) => (
            <MultiSelectorItem
              key={i}
              value={option.value}
            >
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default MultiSelectTest;
