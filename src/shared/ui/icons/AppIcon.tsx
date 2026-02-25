import { IconType } from "react-icons";
import { iconMap } from "./iconMap";

type AppIconProps = {
  name: string;
  size?: number;
  color?: string;
};

export function AppIcon({ name, size = 20, color = "currentColor" }: AppIconProps) {
  const Icon: IconType | undefined = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} color={color} aria-hidden />;
}
