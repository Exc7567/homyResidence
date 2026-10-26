# Room videos

One video per room type, opened full screen from that room card ("Lihat Video", played without sound). **.mp4 only**, used as it is.

    <property folder>/<room type>.mp4            e.g. A7/Deluxe.mp4
    <property folder>/<room type>/<name>.mp4     e.g. A7/DELUXE/deluxe.mp4

- Property folder: `A7`, `H14`, `PARAHYANGAN`, `ALAMANDA`
- Room type: `standard`, `superior`, `deluxe`, `executive`, `small`
- Upper or lower case both work. A room type without a video shows no button.
- Rebuild the site after adding a video (`npm run build`, or push to `main`). Check with `npm run verify:data`
  (it also warns when a video has a broken header: repair with `npm run video:fix -- <file>`).
- Keep each file under 100 MB (GitHub limit).

More in the main README, section 3c.
