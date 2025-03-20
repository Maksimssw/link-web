import { Button } from "@/shared/ui/base/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/base/dialog"
import { Input } from "@/shared/ui/base/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/base/form'
import { CalendarIcon, Loader } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/shared/hook/use-toast'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/base/popover"
import { Calendar } from '@/shared/ui/base/calendar'
import { api, Link, useLinkStore } from '@/entities/link'
import { AxiosResponse } from 'axios'

interface Props {
	props: boolean,
	onClose: () => void,
}

export function CreateLink({props, onClose}: Props) {
	const {addLink} = useLinkStore()

	const { mutate, isPending } = useMutation({
		mutationFn: api.createLinkMutationFn,
	});

	const formSchema = z.object({
		originalUrl: z.string().trim().min(1, {
			message: "Оригинальная ссылка обязательна!",
		}),
		alias: z.string().trim(),
		expiresAt: z.date().optional(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			originalUrl: "",
			alias: "",
			expiresAt: undefined,
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutate(values, {
			onSuccess: (result: AxiosResponse<Link>) => {
				addLink(result.data)

				toast({
					title: "Ссылка",
					description: "Ссылка успешно создана!",
					variant: "default",
				});

				onClose()
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
		<Dialog open={props} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="mb-4">
							<FormField
								control={form.control}
								name="originalUrl"
								render={({field}) => (
									<FormItem>
										<FormLabel className="dark:text-[#f1f7feb5] text-sm">
											Оригинальная ссылка
										</FormLabel>
										<FormControl>
											<Input placeholder="https://google.com" {...field} />
										</FormControl>
										<FormMessage/>
									</FormItem>
								)}
							/>
						</div>
						<div className="mb-4">
							<FormField
								control={form.control}
								name="alias"
								render={({field}) => (
									<FormItem>
										<FormLabel className="dark:text-[#f1f7feb5] text-sm">
											Алиас
										</FormLabel>
										<FormControl>
											<Input
												placeholder="g1"
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
								name="expiresAt"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Дата окончания ссылки</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-full pl-3 text-left font-normal",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date < new Date()
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormDescription>
											Вы можете указать дату, когда ссылки перестанет действовать и удалится
										</FormDescription>
										<FormMessage />
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
								Создать
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
			</DialogContent>
		</Dialog>
	)
}
