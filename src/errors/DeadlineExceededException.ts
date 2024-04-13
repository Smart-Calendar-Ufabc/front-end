export class DeadlineExceededException extends Error {
  constructor() {
    super('Deadline exceeded')
  }
}
