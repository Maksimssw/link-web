"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from '@/entities/signup'
import { toast } from "@/shared/hook/use-toast";
import Logo from "@/shared/ui/logo";
import { Link } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/base/form'
import { ArrowRight, Loader } from 'lucide-react'
import { Button } from "@/shared/ui/base/button";
import { Input } from '@/shared/ui/base/input'
import SuccessfulRegistration from '@/entities/signup/ui/successful-registration/successful-registration'

export default function SignUp() {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { mutate, isPending } = useMutation({
		mutationFn: api.registerMutationFn,
	});

	const formSchema = z.object({
		username: z.string().trim().min(1, {
			message: "Name is required",
		}),
		email: z.string().trim().email().min(1, {
			message: "Email is required",
		}),
		password: z.string().trim().min(1, {
			message: "Password is required",
		}),
		confirmPassword: z.string().min(1, {
			message: "Confirm Password is required",
		}),
	}).refine((val) => val.password === val.confirmPassword, {
		message: "Password does not match",
		path: ["confirmPassword"],
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: ""
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutate(values, {
			onSuccess: () => {
				setIsSubmitted(true);
			},
			onError: (error) => {
				console.log(error);
				toast({
					title: "Error",
					description: error.message,
					variant: "destructive",
				});
			},
		});
	};

	return (
		<>
				{!isSubmitted ? (
					<div className="max-w-[590px]   p-5 rounded-md">
						<Logo />

						<h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center">
							Create a Link account
						</h1>
						<p className="mb-6 text-center text-base dark:text-[#f1f7feb5] font-normal">
							Already have an account?{" "}
							<Link className="text-primary" to="/auth">
								Sign in
							</Link>
							.
						</p>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="mb-4">
									<FormField
										control={form.control}
										name="username"
										render={({field}) => (
											<FormItem>
												<FormLabel className="dark:text-[#f1f7feb5] text-sm">
													Name
												</FormLabel>
												<FormControl>
													<Input placeholder="camilohill" autoComplete='username' {...field} />
												</FormControl>
												<FormMessage/>
											</FormItem>
										)}
									/>
								</div>
								<div className="mb-4">
									<FormField
										control={form.control}
										name="email"
										render={({field}) => (
											<FormItem>
												<FormLabel className="dark:text-[#f1f7feb5] text-sm">
													Email
												</FormLabel>
												<FormControl>
													<Input
														placeholder="camilo@hill.com"
														autoComplete='username'
														{...field}
													/>
												</FormControl>
												<FormMessage/>
											</FormItem>
										)}
									/>
								</div>
								<div className="mb-4">
									<FormField
										control={form.control}
										name="password"
										render={({field}) => (
											<FormItem>
												<FormLabel className="dark:text-[#f1f7feb5] text-sm">
													Password
												</FormLabel>
												<FormControl>
													<Input type="password" autoComplete='new-password' placeholder="••••••••••••" {...field} />
												</FormControl>
												<FormMessage/>
											</FormItem>
										)}
									/>
								</div>

								<div className="mb-4">
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({field}) => (
											<FormItem>
												<FormLabel className="dark:text-[#f1f7feb5] text-sm">
													Confirm Password
												</FormLabel>
												<FormControl>
													<Input
														autoComplete='new-password'
														type="password"
														placeholder="••••••••••••"
														{...field}
													/>
												</FormControl>
												<FormMessage/>
											</FormItem>
										)}
									/>
								</div>
								<Button
									className="w-full text-[15px] h-[40px] !bg-blue-500 text-white font-semibold"
									disabled={isPending}
									type="submit"
								>
									{isPending && <Loader className="animate-spin" />}
									Create account
									<ArrowRight />
								</Button>

								<div className="mb-4 mt-4 flex items-center justify-center">
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
						<p className="text-xs font-normal mt-4">
							By signing up, you agree to our{" "}
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
				) : <SuccessfulRegistration />
				}
		</>
	);
}
