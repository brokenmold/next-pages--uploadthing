import type { NextApiRequest, NextApiResponse } from "next";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" }); // Fake auth function

// File Router -- Can contain multiple files
export const ourFileRouter = {

  // Define File Route(s) (each w/ unique routeSlug)
  imageUploader: f({ image: { maxFileSize: "4MB" } })

    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, res }) => {

      // This code runs on your server before upload
      const user = await auth(req, res);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId);
      console.log("Upload Metadata:", metadata);

      // console.log("Upload File Object: ", file.url);
      console.log("Upload File Object: ", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
