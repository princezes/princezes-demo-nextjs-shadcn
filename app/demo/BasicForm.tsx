"use client"

import { Button } from "@/components/ui/button"
import {
 Field,
 FieldDescription,
 FieldError,
 FieldGroup,
 FieldLabel,
 FieldLegend,
 FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@tanstack/react-form"
import { SubmitEvent } from "react"
import z from "zod"

const formSchema = z.object({
 title: z
  .string()
  .min(5, "Bug title must be at least 5 characters.")
  .max(32, "Bug title must be at most 32 characters."),
 description: z
  .string()
  .min(7, "Description must be at least 7 characters.")
  .max(100, "Description must be at most 100 characters."),
})
export default function BasicForm() {
 const form = useForm({
  defaultValues: {
   title: "",
   description: "",
  },
  validators: {
   onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
   console.log(value)
  },
 })
 function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
  e.preventDefault()
  form.handleSubmit()
 }
 return (
  <div className="w-full mx-auto max-w-sm space-y-6 border p-5 rounded-lg">
   <form onSubmit={handleSubmit}>
    <FieldGroup>
     <FieldSet>
      <FieldLegend>Bug Report</FieldLegend>
      <FieldDescription>
       Help us improve by reporting bugs you encounter.
      </FieldDescription>
      <FieldGroup>
       <form.Field
        name="title"
        children={(field) => {
         const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
         return (
          <Field data-invalid={isInvalid}>
           <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
           <Input
            id={field.name}
            // name={field.name}
            placeholder="title"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={isInvalid}
           />
           {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
         )
        }}
       />
       <form.Field
        name="description"
        children={(field) => {
         const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
         return (
          <Field data-invalid={isInvalid}>
           <FieldLabel htmlFor={field.name}>Description</FieldLabel>
           <Textarea
            placeholder="Type your message here."
            id={field.name}
            // name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={isInvalid}
           />
           <FieldDescription>
            Include steps to reproduce, expected behavior, and what actually
            happened.
           </FieldDescription>
           {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
         )
        }}
       />
      </FieldGroup>
     </FieldSet>

     <Field>
      <Button type="button" onClick={() => form.reset()}>
       Reset
      </Button>
      <Button type="submit">Submit</Button>
     </Field>
    </FieldGroup>
   </form>
  </div>
 )
}
