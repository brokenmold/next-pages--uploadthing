import type { NextApiRequest, NextApiResponse } from "next";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

// Fake auth function
const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" });

// File Router -- Can contain multiple files
export const ourFileRouter = {

  // Define File Route(s) -- each w/ unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })

    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, res }) => {

      // Runs on server before upload
      const user = await auth(req, res);

      // If thrown, prevents user upload
      if (!user) throw new Error("Unauthorized");

      // Returned as `metadata` upon onUploadComplete
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {

      // Runs on server after upload

      // console.log("Upload complete for userId:", metadata.userId);
      console.log("Upload Metadata:", metadata);

      // console.log("Upload File Object: ", file.url);
      console.log("Upload File Object: ", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
