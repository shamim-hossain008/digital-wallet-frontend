/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthSkeleton } from "@/components/loading/AuthSkeleton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { setAuth } from "@/redux/features/auth/auth.slice";
import type { ILoginRequest } from "@/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const form = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const roleRoutes: Record<string, string> = {
    ADMIN: "/admin/dashboard",
    AGENT: "/agent/dashboard",
    USER: "/user/dashboard",
  };

  const handleRoleRedirect = (role: string) => {
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    } else {
      navigate(roleRoutes[role] || "/user/dashboard");
    }
  };

  const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    try {
      const res = await login(data).unwrap();

      const userData = res?.data;
      if (res.success && userData) {
        dispatch(
          setAuth({
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken ?? null,
            user: userData.user,
          })
        );

        localStorage.setItem(
          "dw_auth",
          JSON.stringify({
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken ?? null,
            user: { ...userData.user, password: undefined },
          })
        );

        toast.success("User login successful!");
        handleRoleRedirect(userData.user.role);
      }
    } catch (error: any) {
      const message =
        error?.data?.message ||
        "Login failed! Please check your email or password.";
      toast.error(message);
    }
  };

  if (isLoading) return <AuthSkeleton />;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner className="w-4 h-4" /> : "Login"}
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => window.open(`${config.baseUrl}/auth/google`, "_self")}
        >
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline">
          Register Now
        </Link>
      </div>
    </div>
  );
}
