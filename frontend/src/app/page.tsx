"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSingIn } from "@/hooks/useSingIn";
import { AlertCustomized } from "@/components/alert";

export default function Home() {
  const {
    alert,
    setAlert,
    isLoading,
    HandleSubmitFormLogin,
    register,
    handleSubmit,
    formState: { errors },
  } = useSingIn();

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="mx-auto grid w-[350px] gap-6 border border-gray-500 rounded-sm p-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Digite seu e-mail abaixo para fazer login em sua conta
          </p>
        </div>
        <form onSubmit={handleSubmit(HandleSubmitFormLogin)} noValidate>
          {alert.message && (
            <AlertCustomized
              typeResponse={alert.type}
              error={alert.message}
              setAlert={setAlert}
            />
          )}
          <div className="grid gap-4 pt-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {errors.email ? (
                <p className="text-red-500 w-72 text-xs h-4">
                  {errors.email.message}
                </p>
              ) : (
                <p className="w-72 text-xs px-2 h-4"></p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline "
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                required
              />
              {errors.password ? (
                <p className="text-red-500 w-72 text-xs h-4">
                  {errors.password.message}
                </p>
              ) : (
                <p className="w-72 text-xs h-4"> </p>
              )}
            </div>
            {isLoading === true ? (
              <Button type="button" className="w-full " disabled>
                Enviando...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}
            {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
