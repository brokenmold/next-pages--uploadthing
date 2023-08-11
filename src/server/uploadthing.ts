import type { NextApiRequest, NextApiResponse } from "next";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

// ! Get User Auth
const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" });

// > File Router -- Can contain multiple files
export const ourFileRouter = {

  // > Define File Route(s) each w/ unique routeSlug
  // > Set permissions, file types for route
  imageUploader: f({ image: { maxFileSize: "4MB" } })

  // ? Run on server before upload
  .middleware(async ({ req, res }) => {

    // ! Get User
    //^ const user = await auth(req, res);
    const user = auth(req, res);

    // > If not authorized, throw error
    if (!user) throw new Error("Unauthorized");

    return { userId: user.id };
  })
  .onUploadComplete(async ({ metadata, file }) => {

    // > Post-Upload
    // ? Metadata Object
      // metadata.userID
      // metadata.fileSize
      // metadata.fileSlug
    // ? File Object
      // file.url
    // ! Handle return
    console.log("Upload Metadata: ", metadata);
    console.log("Upload File Object: ", file);
  }),
};
//^ } satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
