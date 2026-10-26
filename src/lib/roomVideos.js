// Room videos found in public/property-videos/ at build time (scripts/room-videos.mjs).
// Keys are lower case folder names: { a7: { deluxe: '/property-videos/A7/DELUXE/deluxe.mp4' } }.
import ROOM_VIDEOS from 'virtual:room-videos';

// The video of a room type, or null. Folders match the property slug and the room id or name, in any case.
export const roomVideo = (property, room) => {
  const rooms = ROOM_VIDEOS[property.slug.toLowerCase()];
  return rooms?.[room.id.toLowerCase()] ?? rooms?.[room.name.toLowerCase()] ?? null;
};
