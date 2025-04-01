import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface ColorPickerProps {
  value: string;
  onChange: (e: any) => void;
  id: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, id }) => {
  const [color, setColor] = useState(value || "#ffffff");
  const [localColor, setLocalColor] = useState(value || "#ffffff");
  const [opacity, setOpacity] = useState(100);
  const [localOpacity, setLocalOpacity] = useState(100);

  // Update local state when props change
  useEffect(() => {
    if (value) {
      setColor(value);
      setLocalColor(value);
    }
  }, [value]);

  // Convert hex to rgba for opacity support
  const hexToRgba = (hex: string, opacity: number): string => {
    hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  // Local color change during dragging (doesn't trigger onChange)
  const handleLocalColorChange = (newColor: string) => {
    setLocalColor(newColor);
  };

  // Final color change on mouse up
  const handleFinalColorChange = () => {
    setColor(localColor);

    // Create a synthetic event to work with the existing handler
    const syntheticEvent = {
      target: {
        id: id,
        value: opacity < 100 ? hexToRgba(localColor, opacity) : localColor,
      },
    };

    onChange(syntheticEvent);
  };

  // Local opacity change (doesn't trigger onChange)
  const handleLocalOpacityChange = (newOpacity: number[]) => {
    setLocalOpacity(newOpacity[0]);
  };

  // Final opacity change
  const handleFinalOpacityChange = () => {
    const opacityValue = localOpacity;
    setOpacity(opacityValue);

    // Create a synthetic event
    const syntheticEvent = {
      target: {
        id: id,
        value: opacityValue < 100 ? hexToRgba(color, opacityValue) : color,
      },
    };

    onChange(syntheticEvent);
  };

  // Handle direct hex input
  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newColor)) {
      setLocalColor(newColor);
      setColor(newColor);

      // Create a synthetic event
      const syntheticEvent = {
        target: {
          id: id,
          value: opacity < 100 ? hexToRgba(newColor, opacity) : newColor,
        },
      };

      onChange(syntheticEvent);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>Background Color</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            id={id}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: color }}
              />
              <span>{color.toUpperCase()}</span>
              {opacity < 100 && <span>{opacity}%</span>}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <Tabs defaultValue="solid">
            <TabsList className="w-full mb-4">
              <TabsTrigger
                value="solid"
                className="flex-1"
              >
                Solid
              </TabsTrigger>
              <TabsTrigger
                value="gradient"
                className="flex-1"
              >
                Gradient
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="solid"
              className="space-y-4"
            >
              <HexColorPicker
                color={localColor}
                onChange={handleLocalColorChange}
                onMouseUp={handleFinalColorChange}
                onTouchEnd={handleFinalColorChange}
              />

              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hex-input">Hex</Label>
                  <Input
                    id="hex-input"
                    value={localColor}
                    onChange={handleHexInput}
                    onBlur={() => {
                      setColor(localColor);
                      handleFinalColorChange();
                    }}
                    className="w-24 h-8"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="opacity-slider">Opacity</Label>
                    <span className="text-sm">{localOpacity}%</span>
                  </div>
                  <Slider
                    id="opacity-slider"
                    min={0}
                    max={100}
                    step={1}
                    value={[localOpacity]}
                    onValueChange={handleLocalOpacityChange}
                    onValueCommit={() => handleFinalOpacityChange()}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="gradient"
              className="flex items-center justify-center h-40"
            >
              <p className="text-sm text-gray-500">Gradient picker coming soon</p>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
