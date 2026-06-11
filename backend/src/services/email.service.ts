import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? 'noreply@lostandfound.app'

async function send(to: string, subject: string, html: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[email] SMTP_USER/SMTP_PASS not set — skipping email to', to)
    return
  }
  try {
    await transporter.sendMail({ from: FROM, to, subject, html })
  } catch (err) {
    console.error(`[email] failed to send "${subject}" to ${to}:`, err)
  }
}

export function sendWelcomeEmail(user: { name: string; personal_email: string }) {
  return send(
    user.personal_email,
    'Welcome to Lost & Found',
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Welcome, ${user.name}!</h2>
      <p>Your Lost & Found account has been created.</p>
      <p>You can now browse reported items and submit claims for anything you've lost.</p>
      <p style="color:#888;font-size:12px">If you didn't create this account, please ignore this email.</p>
    </div>
    `
  )
}

export function sendClaimInvoiceEmail(claim: any) {
  const email: string | undefined = claim.claimer?.personal_email
  if (!email) return Promise.resolve()

  const item = claim.item
  const location = [item?.building?.name, item?.room?.name].filter(Boolean).join(', Room ')
  const foundDate = item?.found_at
    ? new Date(item.found_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'
  const submittedDate = new Date(claim.requested_at).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return send(
    email,
    `Claim Submitted – ${item?.name ?? 'Item'}`,
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Claim Submitted</h2>
      <p>Hi ${claim.claimer.name}, your claim has been received and is pending staff review.</p>

      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:bold;width:40%">Claim ID</td>
          <td style="padding:8px 12px">${claim.claim_id}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold">Item</td>
          <td style="padding:8px 12px">${item?.name ?? '—'}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:bold">Category</td>
          <td style="padding:8px 12px">${item?.category?.name ?? '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold">Found at</td>
          <td style="padding:8px 12px">${location || '—'}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:bold">Date found</td>
          <td style="padding:8px 12px">${foundDate}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold">Your description</td>
          <td style="padding:8px 12px">${claim.ownership_desc}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:bold">Submitted</td>
          <td style="padding:8px 12px">${submittedDate}</td>
        </tr>
      </table>

      <p>Staff will review your claim and notify you of their decision via email.</p>
      <p style="color:#888;font-size:12px">Please keep this email for your records.</p>
    </div>
    `
  )
}

export function sendClaimStatusEmail(claim: any) {
  const email: string | undefined = claim.claimer?.personal_email
  if (!email) return Promise.resolve()

  const approved = claim.status === 'APPROVED'
  const itemName = claim.item?.name ?? 'your item'
  const subject = `Claim ${approved ? 'Approved' : 'Rejected'} – ${itemName}`

  const outcomeBlock = approved
    ? `<p style="color:#2e7d32;font-weight:bold">Your claim has been approved.</p>
       <p>Please visit the Lost &amp; Found office to collect <strong>${itemName}</strong>. Bring a valid ID.</p>`
    : `<p style="color:#c62828;font-weight:bold">Your claim has been rejected.</p>
       <p>If you believe this was a mistake, you may contact the Lost &amp; Found office for further assistance.</p>`

  const notesBlock = claim.staff_notes
    ? `<p><strong>Staff notes:</strong> ${claim.staff_notes}</p>`
    : ''

  return send(
    email,
    subject,
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Claim Update</h2>
      <p>Hi ${claim.claimer.name},</p>
      ${outcomeBlock}
      <p><strong>Item:</strong> ${itemName}</p>
      <p><strong>Claim ID:</strong> ${claim.claim_id}</p>
      ${notesBlock}
      <p style="color:#888;font-size:12px">This is an automated notification from the Lost &amp; Found system.</p>
    </div>
    `
  )
}

export function sendItemExpiredFinderEmail(item: { name: string; finder_name?: string | null; finder_contact?: string | null }) {
  const contact = item.finder_contact ?? ''
  if (!contact.includes('@')) return Promise.resolve()

  return send(
    contact,
    `Item Available for Collection – ${item.name}`,
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Item Ready for Collection</h2>
      <p>Hi ${item.finder_name ?? 'there'},</p>
      <p>The item you turned in — <strong>${item.name}</strong> — has completed its claim period without being collected.</p>
      <p>As the finder, you are now eligible to collect it from the Lost &amp; Found office. Please bring a valid ID.</p>
      <p style="color:#888;font-size:12px">This is an automated notification from the Lost &amp; Found system.</p>
    </div>
    `
  )
}
