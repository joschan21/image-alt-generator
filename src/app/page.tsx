"use client"

import { FC } from "react"
import { Button, buttonVariants } from "@/ui/button"
import { FileInput } from "@/ui/file-input"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const metadata = {
  title: "ImageToAlt - Home",
}

const page: FC = () => {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Easily create alt-descriptions <br className="hidden sm:inline" />
          for your images.
        </h1>
        <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
          Bulk-generate SEO-optimized alt-descriptions that you can copy and
          paste into your app. Free & open-source.
        </p>
      </div>
      <div className="flex gap-4">
        <FileInput />
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-fit">
            <Button
              disabled
              className={buttonVariants({ size: "lg", className: "w-fit" })}
            >
              Download as CSV
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Available soon</p>
        </TooltipContent>
      </Tooltip>
    </section>
  )
}

export default page
