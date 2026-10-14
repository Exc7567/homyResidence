// Facility catalog. Properties and room types reference these ids.
// `icon` is a lucide-react icon name (mapped in src/components/common/Icon.jsx).

export const FACILITIES = {
  ac:                { label: 'AC',                                   icon: 'AirVent' },
  wifi:              { label: 'WiFi',                                 icon: 'Wifi' },
  furnished:         { label: 'Fully Furnished',                      icon: 'Sofa' },
  bathroom_in:       { label: 'Kamar Mandi Dalam',                    icon: 'ShowerHead' },
  bathroom_out:      { label: 'Kamar Mandi Luar',                     icon: 'DoorOpen' },
  water_heater:      { label: 'Water Heater',                         icon: 'Flame' },
  laundry_free:      { label: 'Free Laundry (cuci + setrika)',        icon: 'Shirt' },
  washing_machine:   { label: 'Mesin Cuci (Lantai 4)',                icon: 'WashingMachine' },
  parking_front:     { label: 'Parkir di Teras Depan',                icon: 'ParkingCircle' },
  parking_basement:  { label: 'Parkir Basement',                      icon: 'Car' },
  electricity_token: { label: 'Listrik Token per Kamar',                icon: 'Zap' },
};
