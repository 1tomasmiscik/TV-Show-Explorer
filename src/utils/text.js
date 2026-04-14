import { decode } from 'html-entities'

export function stripHtml(html) {
  if (!html) return ''
  // remove HTML tags
  let text = html.replace(/<[^>]*>/g, '')
  // normalize spaced amp variants like "& amp;" -> "&amp;"
  text = text.replace(/&\s*amp\s*;/gi, '&amp;')
  // decode entities (named, numeric, hex). Run a few passes to handle double-encoding
  try {
    const max = 5
    let pass = 0
    let prev = text
    while (pass < max) {
      const decoded = decode(prev)
      if (decoded === prev) break
      prev = decoded
      pass++
    }
    return prev
  } catch (e) {
    return text
  }
}

export function truncate(text, max = 70) {
  if (!text) return ''
  const chars = Array.from(text)
  return chars.length > max ? chars.slice(0, max).join('').trimEnd() + '...' : text
}
