"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            startDateTime: "",
            anyoneCanJoin: false,
            emails: [{ value: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "emails",
    });

    const watchAnyoneCanJoin = form.watch("anyoneCanJoin");

    async function onSubmit(data) {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
        setIsSubmitting(false);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen bg-background p-8"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
                Create a Meeting
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full max-w-md"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meeting Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter meeting name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter meeting description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date and Time</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="anyoneCanJoin"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                                <div className="space-y-1">
                                    <FormLabel>Anyone can join</FormLabel>
                                    <FormDescription>
                                        If unchecked, specify email addresses of invitees.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    {!watchAnyoneCanJoin && (
                        <div className="space-y-2">
                            <FormLabel>Invitee Emails</FormLabel>
                            {fields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`emails.${index}.value`}
                                    render={({ field: emailField }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Input placeholder="Enter email address" {...emailField} />
                                                    {index > 0 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            aria-label="Remove email"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append({ value: "" })}
                            >
                                Add Email
                            </Button>
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating Meeting..." : "Create Meeting"}
                    </Button>
                </form>
            </Form>
        </motion.div>
    );
}
