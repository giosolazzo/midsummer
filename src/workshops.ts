// src/workshops.ts

export type Workshop = {
  title: string;
  tag: string;       // Buttondown tag to segment subscribers
  poster: string;    // poster image path in /public
  sheet: string;     // PDF worksheet path in /public
  video?: string;    // optional local video path or stream URL
  youtube?: string;  // optional YouTube URL
};

export const WORKSHOPS: Record<string, Workshop> = {
  jonathan: {
    title: "Jonathan's Guided Workshop",
    tag: "Midsummer-Jonathan",
    poster: "/workshops/MS01-Reichental/assets/jonathan.png",
    sheet: "/workshops/MS01-Reichental/assets/MS01-Different_version_of_you.pdf",
    // Leave these empty until you embed YouTube or upload a file:
    // video: "/workshops/jonathan.mp4",
    // youtube: "https://www.youtube.com/@midsummerlab",
  },

  // add future guests here (slug: {...})
};
