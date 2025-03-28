"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormFeild from "./FormFeild";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().min(2).max(50),
    password: z.string().min(6),
  });
};
function AuthForm({ type }: { type: FormType }) {
  const isSignIn = type === "sign-in";

  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account Created Successfully.Please Login");
        router.push("/sign-in");
      } else {
        toast.success("Login Successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There is Error : ${error}`);
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row justify-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={38} />
          <h2 className="text-primary-100">PrepAI</h2>
        </div>
        <h3 className="text-center mt-0">Ace Your Interview with PrepAI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4 form"
          >
            {!isSignIn && (
              <FormFeild
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter Name"
                type="text"
              />
            )}
            <FormFeild
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter Your Email"
              type="email"
            />
            <FormFeild
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter a Password"
              type="password"
            />
            <Button className="w-full btn" type="submit">
              {!isSignIn ? "Sign Up" : "Sign In"}
            </Button>
            <div className="flex justify-center">
              <p className="text-center">
                {isSignIn ? "No Account Yet ?" : "Already have an Account ?"}
              </p>
              <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="font-bold text-user-primary ml-1 hover:underline"
              >
                {isSignIn ? "Sign-up" : "Sign-in"}
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AuthForm;
