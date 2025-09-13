import { redirect } from "next/navigation";

export default function Home() {
  redirect("/midsummer");
  return null;
}
