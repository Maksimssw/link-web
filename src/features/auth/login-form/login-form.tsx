import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {ArrowRight, Loader} from "lucide-react";
import {Link} from 'react-router-dom'
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/base/form";
import { Input } from "@/shared/ui/base/input";
import { Button } from "@/shared/ui/base/button";
import { useNavigate } from 'react-router-dom';
import Logo from "@/shared/ui/logo";
import {toast} from "@/shared/hook/use-toast";
import { api, useAuthStore, User } from '@/entities/auth'
import { AxiosResponse } from 'axios'

export default function Login() {
  const navigate = useNavigate();
  const {setUser} = useAuthStore()

  const { mutate, isPending } = useMutation({
    mutationFn: api.loginMutationFn,
  });

  const formSchema = z.object({
    login: z.string().trim().min(1, {
      message: "Login is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (result: AxiosResponse<User>) => {
        setUser(result.data);
        navigate(`/`)
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
      <div className="max-w-[590px] h-full p-5 rounded-md">
        <Logo />

        <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
          Log in to Link
        </h1>
        <p className="mb-8 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
          Don't have an account?
          <Link className="text-primary" to="/signup">
            Sign up
          </Link>
          .
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Login
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="camilo" autoComplete="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input type='password' autoComplete="current-password" placeholder="••••••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full text-[15px] h-[40px] text-white font-semibold"
              disabled={isPending}
              type="submit"
            >
              {isPending && <Loader className="animate-spin" />}
              Sign in
              <ArrowRight />
            </Button>

            <div className="mb-6 mt-6 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                data-orientation="horizontal"
                role="separator"
              ></div>
              <div
                aria-hidden="true"
                className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                data-orientation="horizontal"
                role="separator"
              ></div>
            </div>
          </form>
        </Form>
        <p className="text-xs dark:text-slate- font-normal mt-7">
          By signing in, you agree to our{" "}
          <a className="text-primary hover:underline" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="text-primary hover:underline" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </div>
  );
}
