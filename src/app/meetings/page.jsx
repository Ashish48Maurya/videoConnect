"use client"

import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, X } from "lucide-react"
import { useRouter } from 'next/navigation';


export default function Page() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const router = useRouter();
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      name: "Team Standup",
      description: "Daily sync-up with the team to discuss progress and blockers.",
      startDateTime: new Date(new Date().getTime() + 300000).toISOString(), // 5 min from now
      anyoneCanJoin: true,
      emails: [],
    },
    {
      id: 2,
      name: "Project Kickoff",
      description: "Initial meeting to discuss project goals and roadmap.",
      startDateTime: new Date(new Date().getTime() - 1800000).toISOString(), // 30 min ago
      anyoneCanJoin: false,
      emails: [{ value: "john@example.com" }, { value: "jane@example.com" }],
    },
    {
      id: 3,
      name: "Client Review",
      description: "Monthly review meeting with the client to discuss deliverables.",
      startDateTime: new Date(new Date().getTime() - 7200000).toISOString(), // 2 hours ago
      anyoneCanJoin: true,
      emails: [],
    },
  ])

  const [editingMeeting, setEditingMeeting] = useState(null)

  const form = useForm({
    defaultValues: {
      name: "",
      startDateTime: "",
      anyoneCanJoin: false,
      emails: [{ value: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  })

  const watchAnyoneCanJoin = form.watch("anyoneCanJoin")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatus = (startDateTime) => {
    const startTime = new Date(startDateTime)
    if (startTime > currentTime) {
      return "upcoming"
    } else if (startTime <= currentTime && startTime.getTime() + 3600000 > currentTime.getTime()) {
      return "join"
    } else {
      return "ended"
    }
  }

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const redirect = (id)=>{
    router.push(`/join/${id}`)
  }

  const handleEdit = (meeting) => {
    setEditingMeeting(meeting)
    form.reset({
      name: meeting.name,
      description: meeting.description,
      startDateTime: new Date(meeting.startDateTime).toISOString().slice(0, 16),
      anyoneCanJoin: meeting.anyoneCanJoin,
      emails: meeting.emails.length > 0 ? meeting.emails : [{ value: "" }],
    })
  }

  const onSubmit = (data) => {
    const updatedMeetings = meetings.map((meeting) =>
      meeting.id === editingMeeting.id ? { ...meeting, ...data } : meeting,
    )
    setMeetings(updatedMeetings)
    setEditingMeeting(null)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Meetings</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Start Date & Time</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell className="font-medium">{meeting.name}</TableCell>
              <TableCell>{meeting.description}</TableCell>
              <TableCell>{formatDate(meeting.startDateTime)}</TableCell>
              <TableCell>{meeting.anyoneCanJoin ? "Open to all" : "Invite only"}</TableCell>
              <TableCell>
                {getStatus(meeting.startDateTime) === "join" ? (
                  <Button size="sm" variant="outline" onClick={redirect(meeting.id)}>
                    Join Now
                  </Button>
                ) : (
                  <Badge
                    variant={getStatus(meeting.startDateTime) === "join" ? "default" : "secondary"}
                    className={`
                  ${getStatus(meeting.startDateTime) === "upcoming" ? "bg-blue-100 text-blue-800" : ""}
                  ${getStatus(meeting.startDateTime) === "ended" ? "bg-gray-100 text-gray-800" : ""}
                  `}
                  >
                    {getStatus(meeting.startDateTime) === "upcoming" ? "Upcoming" : "Ended"}
                  </Badge>
                )}
              </TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    {getStatus(meeting.startDateTime) === "join" && (
                      <Button size="sm" variant="outline" onClick={() => handleEdit(meeting)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Meeting</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <FormDescription>If unchecked, specify email addresses of invitees.</FormDescription>
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
                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          Update Meeting
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}