import type { FC, HTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {}

const Spinner: FC<SpinnerProps> = ({ className, ...props }) => {
  return (
    <Loader2
      {...props}
      className={cn('mr-2 h-4 w-4 animate-spin', className)}
    />
  )
}

export default Spinner
