import { z } from "zod";

export const FormSchema = z.object({
  game_name: z.string().min(6, {
    message: "Game Name must be at least 6 characters.",
  }),
  comment: z.string(),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB."
    )
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
      "Only JPEG, PNG, or SVG images are allowed."
    ),
});

export type TrustSignal = {
  id: string;
  game_name: string;
  comment: string;
  image_path: string;
};

export type FormData = z.infer<typeof FormSchema>;
