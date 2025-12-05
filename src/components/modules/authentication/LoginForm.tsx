/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthSkeleton } from "@/components/loading/AuthSkeleton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParas] = useSearchParams();

  const redirectTo = searchParas.get("redirectTo");
  const { user } = useSelector((state: any) => state.auth.user);

  const form = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //
  const handleRoleRedirect = (role: string) => {
    if (redirectTo) {
      return navigate(redirectTo, { replace: true });
    }
    switch (role) {
      case "ADMIN":
        navigate("/admin/dashboard");
        break;
      case "AGENT":
        navigate("/agent/dashboard");
        break;
      default:
        navigate("/user/dashboard");
        break;
    }
  };

  const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    try {
      const res = await login(data).unwrap();

      const wrapperData = res.data;

      if (res.success && wrapperData) {
        // Dispatch auth slice
        dispatch(
          setAuth({
            accessToken: wrapperData.accessToken,
            refreshToken: wrapperData.refreshToken ?? null,
            user: wrapperData.user,
          })
        );
        // Persist minimal auth for axios interceptor or page reloads
        localStorage.setItem(
          "dw_auth",
          JSON.stringify({
            accessToken: wrapperData.accessToken,
            refreshToken: wrapperData.refreshToken ?? null,
            user: { ...wrapperData.user, password: undefined },
          })
        );
        toast.success("user login successfully");
        // console.log(store.getState().auth);
        handleRoleRedirect(wrapperData.user.role);
      }
    } catch (error: any) {
      console.log("Login error", error);

      if (error.data?.message === "Password does not match") {
        toast.error("Invalid credentials");
      }
      const errorMessage =
        error?.data?.message || // backend message
        (typeof error === "string" ? error : undefined) || // plain string error
        "Login failed. Please try again.";

      toast.error(errorMessage);
    }
  };

  if (user === undefined && isLoading) {
    return <AuthSkeleton />;
  }

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
            {/* User Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@gmail.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* passWord */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner className="w-4 h-4" /> : "Login"}
            </Button>
          </form>
        </Form>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?
        <Link to="/register" className="underline underline-offset-4">
          Register Now
        </Link>
      </div>
    </div>
  );
}
