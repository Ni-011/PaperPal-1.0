export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
}
