# Next alt generator

A Next.js 13 project for generating image alt tags automatically and in bulk.

## Features

- Radix UI Primitives
- Tailwind CSS
- Fonts with `@next/font`
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Automatic import sorting with `@ianvs/prettier-plugin-sort-imports`

## Tailwind CSS Features

- Class merging with `taiwind-merge`
- Animation with `tailwindcss-animate`
- Conditional classes with `clsx`
- Variants with `class-variance-authority`
- Automatic class sorting with `eslint-plugin-tailwindcss`

## Import Sort

The starter comes with `@ianvs/prettier-plugin-sort-imports` for automatically sort your imports.

### Input

```tsx
import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import "@/styles/globals.css"
import { twMerge } from "tailwind-merge"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
```

### Output

```tsx
import * as React from "react"
// React is always first.
import Link from "next/link"
// Followed by next modules.
import { twMerge } from "tailwind-merge"

// Followed by third-party modules
// Space
import "@/styles/globals.css"
// styles
import { NavItem } from "@/types/nav"
// types
import { siteConfig } from "@/config/site"
// config
import { cn } from "@/lib/utils"
// lib
import { buttonVariants } from "@/components/ui/button"

// components
```

### Class Merging

The `cn` util handles conditional classes and class merging.

### Input

```ts
cn("px-2 bg-slate-100 py-2 bg-slate-200")
// Outputs `p-2 bg-slate-200`
```

## License & Credits

Licensed under the [MIT license](https://opensource.org/license/mit/).
Boilerplate project template made by [shadcn](https://github.com/shadcn/next-template)
