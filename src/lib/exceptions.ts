import { MAX_FILE_SIZE } from '../config/image'

export class FileTooLargeError extends Error {
  constructor(
    message = `Images cannot be larger than ${MAX_FILE_SIZE / 1000000}MB.`
  ) {
    super(message)
  }
}
