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

      // Pre-Upload -- Runs on server
      const user = await auth(req, res);

      // Check User Auth
      //? >>>>  Check User Against Auth.js Session  <<<<
      if (!user) throw new Error("Unauthorized");

      // Returned as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {

      // Post-Upload -- Runs on server
      console.log("Upload Metadata:", metadata);
      console.log("Upload File Object: ", file);

      // console.log("File Object >> URL: ", file.url);
      // console.log("Metadata >> User ID:", metadata.userId);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
