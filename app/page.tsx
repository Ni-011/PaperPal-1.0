import FileUpload from "@/components/fileUpload";

export default function Home() {
  return (
    // ****************************************************************************************************************
    // This is the root folder, put the code for homepage here:

    // TASK:
    // keep a login button which is a link to /sign-in
    // if the user is signed in (can check that by getting {userId} from auth() in clerk) display the upload button to upload pdf files
    <div>
      <p>Hello</p>
      <FileUpload />
    </div>
  );
}
