export interface Command {
  name: string
  description: string
  link: string
}

export const commands: Command[] = [
  { name: 'ping', description: 'Check the bot\'s latency.', link: '/commands/ping' },
  { name: 'quack', description: 'Make the bot quack.', link: '/commands/quack' },
]
