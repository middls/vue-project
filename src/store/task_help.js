export default class Task {
  constructor (
    title,
    description,
    whatWatch,
    totalTime,
    tags,
    completed,
    editing,
    user = null,
    id = null
  ) {
    this.title = title
    this.description = description
    this.whatWatch = whatWatch
    this.totalTime = totalTime
    this.tags = tags
    this.completed = completed
    this.editing = editing
    this.user = user
    this.id = id
  }
}
