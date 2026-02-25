import { IconType } from "react-icons";
import { FaBrain, FaCompass, FaFeatherAlt, FaFilter, FaFire, FaMapSigns, FaPuzzlePiece, FaProjectDiagram, FaScaleBalanced, FaSeedling, FaSitemap } from "react-icons/fa6";

export const iconMap: Record<string, IconType> = {
  "function.Fi": FaCompass,
  "function.Fe": FaScaleBalanced,
  "function.Ti": FaPuzzlePiece,
  "function.Te": FaProjectDiagram,
  "function.Ni": FaMapSigns,
  "function.Ne": FaFire,
  "function.Si": FaSeedling,
  "function.Se": FaFeatherAlt,
  "ui.brain": FaBrain,
  "ui.filter": FaFilter,
  "ui.stack": FaSitemap
};
