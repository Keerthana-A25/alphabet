import * as FaIcons from "react-icons/fa";

export const iconList = {
  Alpha: {Icon: FaIcons.FaStar, Stage: 'Alpha'},
  Beta: {Icon: FaIcons.FaMedal, Stage: 'Beta'},
  Gamma: {Icon: FaIcons.FaTrophy, Stage: 'Gamma'}
};

export function getIcon(stage: string): any {
  if (stage === 'alpha') {
    return FaIcons.FaStar;
  }
  if (stage === 'beta') {
    return FaIcons.FaMedal;
  }
  if (stage === 'gamma') {
    return FaIcons.FaTrophy;
  }
  return FaIcons.FaStar;
}