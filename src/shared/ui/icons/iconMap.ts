import { IconType } from "react-icons";
import { FaBrain, FaCompass, FaDiagramProject, FaFeatherPointed, FaFilter, FaFire, FaMapLocationDot, FaPuzzlePiece, FaScaleBalanced, FaSeedling, FaSitemap } from "react-icons/fa6";

export const iconMap: Record<string, IconType> = {
  "function.Fi": FaCompass,
  "function.Fe": FaScaleBalanced,
  "function.Ti": FaPuzzlePiece,
  "function.Te": FaDiagramProject,
  "function.Ni": FaMapLocationDot,
  "function.Ne": FaFire,
  "function.Si": FaSeedling,
  "function.Se": FaFeatherPointed,
  "ui.brain": FaBrain,
  "ui.filter": FaFilter,
  "ui.stack": FaSitemap
};
