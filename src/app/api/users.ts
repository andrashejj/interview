import { type NextApiRequest, type NextApiResponse } from "next";
import { UsersSchema } from "~/utils/userSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const resp = await fetch("https://dummyjson.com/users");
  const data = await resp.json();
  const parsed = UsersSchema.safeParse(data);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data" });
  }
  return res.status(200).json(parsed.data.users);
}
