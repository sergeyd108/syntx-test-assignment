const openers = ['Hmm, interesting.', 'Good question!', 'Let me think...', 'Sure thing.', 'Got it.', 'Okay,']

const bodies = [
  "here's what I'd suggest",
  'I think the answer depends on context',
  'that reminds me of something similar',
  "there's a few ways to look at it",
  'I can help with that',
  'it might take a moment to work through',
]

const closers = [
  'Does that make sense?',
  'Want me to go deeper?',
  'Hope that helps!',
  'Let me know what you think.',
  'Anything else?',
]

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]!
}

export function generateMessageText() {
  return [pick(openers), pick(bodies) + '.', pick(closers)].join(' ')
}
