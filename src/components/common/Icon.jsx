import {
  AirVent, Wifi, Sofa, ShowerHead, DoorOpen, Flame, Shirt, WashingMachine,
  ParkingCircle, Car, Zap, CircleHelp,
} from 'lucide-react';

// Maps icon-name strings used in src/data/facilities.js to lucide components.
const ICONS = { AirVent, Wifi, Sofa, ShowerHead, DoorOpen, Flame, Shirt, WashingMachine, ParkingCircle, Car, Zap };

export default function Icon({ name, size = 20, strokeWidth = 1.75, ...rest }) {
  const Cmp = ICONS[name] || CircleHelp;
  return <Cmp size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
