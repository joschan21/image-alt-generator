import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ALLOWED_FILE_TYPES } from '../config/s3'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateFileType(file: File) {
  return ALLOWED_FILE_TYPES.includes(file.type)
}
