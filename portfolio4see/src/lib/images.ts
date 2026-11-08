/**
 * Temporary Unsplash demo imagery.
 * [EDIT ME] Swap these URLs for real photography before launch.
 * Sizes are requested from Unsplash's CDN with crop + quality params so
 * everything arrives HD and correctly cropped (paired with object-cover).
 */
const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const heroBackground = {
  src: unsplash("1522071820081-009f0129c71c", 1920, 1280),
  alt: "Creative studio team collaborating around a table in a modern office",
};

export const teamPhotos = [
  { src: unsplash("1560250097-0b93528c311a", 800, 800), alt: "Portrait of the founder in a bright office" },
  { src: unsplash("1519085360753-af0119f7cbe7", 800, 800), alt: "Portrait of a lead engineer at a workstation" },
  { src: unsplash("1573497019940-1c28c88b4f3e", 800, 800), alt: "Portrait of an automation engineer smiling" },
  { src: unsplash("1494790108377-be9c29b29330", 800, 800), alt: "Portrait of a design lead against a plain wall" },
];

export const workImages: Record<string, { src: string; alt: string }> = {
  "Voice intake agent": {
    src: unsplash("1587560699334-cc4ff634909a", 1280, 720),
    alt: "Voice assistant device on a desk next to a phone",
  },
  "Knowledge copilot": {
    src: unsplash("1551434678-e076c223a692", 1280, 720),
    alt: "Support analytics dashboard open on a laptop screen",
  },
  "Product marketing site": {
    src: unsplash("1467232004584-a241de8bcf5d", 1280, 720),
    alt: "Laptop showing a marketing website design",
  },
  "Editorial platform migration": {
    src: unsplash("1499750310107-5fef28a66643", 1280, 720),
    alt: "Writer working on an editorial article at a laptop",
  },
  "Cost-sane edge platform": {
    src: unsplash("1558494949-ef010cbdcc31", 1280, 720),
    alt: "Server racks in a cloud data centre",
  },
  "Ops dashboard redesign": {
    src: unsplash("1551650975-87deedd944c3", 1280, 720),
    alt: "Dashboard interface design shown on a tablet",
  },
};

export const testimonialAvatars: Record<string, { src: string; alt: string }> = {
  "Sara Malik": {
    src: unsplash("1517841905240-472988babdf9", 200, 200),
    alt: "Portrait of Sara Malik, Operations Director",
  },
};

export const fallbackWorkImage = {
  src: unsplash("1498050108023-c5249f4df085", 1280, 720),
  alt: "Developer workspace with code on screen",
};

export const fallbackAvatar = {
  src: unsplash("1500648767791-00dcc994a43e", 200, 200),
  alt: "Portrait of a client",
};

export const EMPTY_IMAGE = "https://placehold.co/600x400/e2e8f0/64748b?text=No+Image";
export const RANDOM_IMAGE = "https://picsum.photos/800/600";
export const FEMALE_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop";