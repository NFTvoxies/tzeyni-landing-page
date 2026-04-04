"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date) {
  if (!date) {
    return ""
  }

  if (typeof date === "string") {
    const parsed = new Date(date)
    return parsed.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function formatDateToISO(date) {
  if (!date) return ""
  if (typeof date === "string") return date
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function isValidDate(date) {
  if (!date) return false
  if (typeof date === "string") {
    return !isNaN(new Date(date).getTime())
  }
  return !isNaN(date.getTime())
}

export function DatePickerWithInput({ label, value, onChange, placeholder = "Select date..." }) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(value ? new Date(value) : undefined)
  const [month, setMonth] = React.useState(date)
  const [displayValue, setDisplayValue] = React.useState(formatDate(value))

  React.useEffect(() => {
    setDisplayValue(formatDate(value))
    if (value) {
      const newDate = new Date(value)
      setDate(newDate)
      setMonth(newDate)
    }
  }, [value])

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate)
    setMonth(selectedDate)
    setDisplayValue(formatDate(selectedDate))
    onChange(formatDateToISO(selectedDate))
    setOpen(false)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)
    
    const date = new Date(inputValue)
    if (isValidDate(date)) {
      setDate(date)
      setMonth(date)
      onChange(formatDateToISO(date))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm text-neutral-600">{label}</Label>
      )}
      <div className="relative flex gap-2">
        <Input
          value={displayValue}
          placeholder={placeholder}
          className="bg-white pr-10"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-neutral-100"
            >
              <CalendarIcon className="h-4 w-4" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
