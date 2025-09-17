export type Workshop = {
  title: string;
  tag: string;               // Buttondown tag to segment subscribers
  poster: string;            // poster image path in /public
  video: string;             // video file or stream URL (placeholder for now)
  sheet: string;             // PDF worksheet path in /public
  youtube?: string;          // optional public podcast URL
};

export const WORKSHOPS: Record<string, Workshop> = {
  jonathan: {
    title: "Jonathan’s Guided Workshop",
    tag: "Midsummer-Jonathan",
    poster: "/workshops/jonathan-poster.jpg",
    video: "/workshops/jonathan.mp4",
    sheet: "/workshops/jonathan-worksheet.pdf",
    youtube: "",
  },
  // add future guests here (slug: {...})
};
