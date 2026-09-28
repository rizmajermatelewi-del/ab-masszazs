/* POSTs a form to /api/message. Returns 'sent', 'invalid' or 'failed', and
   never throws: a form must always end in a state the visitor can read. */
export async function sendMessage(payload) {
  try {
    const res = await fetch('/api/message', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.ok) return 'sent'
    return data.code === 'invalid' ? 'invalid' : 'failed'
  } catch {
    return 'failed'
  }
}
