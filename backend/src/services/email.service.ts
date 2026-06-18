import nodemailer from 'nodemailer'

function e(value: string | null | undefined): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? 'Lost & Found <noreply@lostandfound.app>'

async function send(to: string, subject: string, html: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[email] SMTP_USER/SMTP_PASS not configured — skipping email to', to)
    return
  }
  try {
    await transporter.sendMail({ from: FROM, to, subject, html })
  } catch (err) {
    console.error(`[email] failed to send "${subject}" to ${to}:`, err)
  }
}

// ── Auth emails ────────────────────────────────────────────────────────────

export function sendVerificationEmail(user: { name: string; uni_email: string }, verificationUrl: string) {
  return send(
    user.uni_email,
    'Verify your Lost & Found account',
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Verify your email</h2>
      <p>Hi ${e(user.name)}, thanks for registering.</p>
      <p>Click the button below to verify your BINUS email and activate your account:</p>
      <p style="margin:24px 0">
        <a href="${e(verificationUrl)}"
           style="background:#1565c0;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">
          Verify Email
        </a>
      </p>
      <p style="color:#888;font-size:12px">This link expires in 24 hours. If you did not create this account, ignore this email.</p>
      <p style="color:#888;font-size:12px">Or copy this link: ${e(verificationUrl)}</p>
    </div>
    `
  )
}

export function sendTempPasswordEmail(user: { name: string; uni_email: string }, tempPassword: string) {
  const loginUrl = `${process.env.FRONTEND_URL ?? 'http://localhost:5173'}/login`
  return send(
    user.uni_email,
    'Your Lost & Found account has been created',
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Account Created</h2>
      <p>Hi ${e(user.name)}, an account has been created for you on the Lost &amp; Found system.</p>
      <p>Use the credentials below to log in. You will be asked to set a new password on your first login.</p>

      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#f5f5f5">
          <td style="padding:10px 14px;font-weight:bold;width:40%">University Email</td>
          <td style="padding:10px 14px">${e(user.uni_email)}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:bold">Temporary Password</td>
          <td style="padding:10px 14px;font-family:monospace;font-size:16px;letter-spacing:2px">${e(tempPassword)}</td>
        </tr>
      </table>

      <p style="margin:24px 0">
        <a href="${e(loginUrl)}"
           style="background:#1565c0;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">
          Log In Now
        </a>
      </p>
      <p style="color:#888;font-size:12px">For security, change your password immediately after logging in.</p>
    </div>
    `
  )
}

// ── Claim emails ───────────────────────────────────────────────────────────

export function sendClaimInvoiceEmail(claim: any) {
  const email: string | undefined = claim.claimer?.uni_email ?? claim.claimer?.personal_email
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
      <p>Hi ${e(claim.claimer.name)}, your claim has been received and is pending staff review.</p>

      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:bold;width:40%">Claim ID</td>
          <td style="padding:8px 12px">${e(claim.claim_id)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold">Item</td>
          <td style="padding:8px 12px">${e(item?.name)}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:bold">Category</td>
          <td style="padding:8px 12px">${e(item?.category?.name) || '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold">Found at</td>
          <td style="padding:8px 12px">${e(location) || '—'}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:bold">Date found</td>
          <td style="padding:8px 12px">${e(foundDate)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold">Your description</td>
          <td style="padding:8px 12px">${e(claim.ownership_desc)}</td>
        </tr>
        <tr style="background:#f5f5f5">
          <td style="padding:8px 12px;font-weight:bold">Submitted</td>
          <td style="padding:8px 12px">${e(submittedDate)}</td>
        </tr>
      </table>

      <p>Staff will review your claim and notify you of their decision via email.</p>
      <p style="color:#888;font-size:12px">Please keep this email for your records.</p>
    </div>
    `
  )
}

export function sendClaimStatusEmail(claim: any) {
  const email: string | undefined = claim.claimer?.uni_email ?? claim.claimer?.personal_email
  if (!email) return Promise.resolve()

  const approved = claim.status === 'APPROVED'
  const itemName = claim.item?.name ?? 'your item'

  const outcomeBlock = approved
    ? `<p style="color:#2e7d32;font-weight:bold">Your claim has been approved.</p>
       <p>Please visit the Lost &amp; Found office to collect <strong>${e(itemName)}</strong>. Bring a valid ID.</p>`
    : `<p style="color:#c62828;font-weight:bold">Your claim has been rejected.</p>
       <p>If you believe this was a mistake, you may contact the Lost &amp; Found office for further assistance.</p>`

  const notesBlock = claim.staff_notes
    ? `<p><strong>Staff notes:</strong> ${e(claim.staff_notes)}</p>`
    : ''

  return send(
    email,
    `Claim ${approved ? 'Approved' : 'Rejected'} – ${itemName}`,
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Claim Update</h2>
      <p>Hi ${e(claim.claimer.name)},</p>
      ${outcomeBlock}
      <p><strong>Item:</strong> ${e(itemName)}</p>
      <p><strong>Claim ID:</strong> ${e(claim.claim_id)}</p>
      ${notesBlock}
      <p style="color:#888;font-size:12px">This is an automated notification from the Lost &amp; Found system.</p>
    </div>
    `
  )
}

// ── Expiration email ───────────────────────────────────────────────────────

export function sendItemExpiredFinderEmail(item: { name: string; finder_name?: string | null; finder_contact?: string | null }) {
  const contact = item.finder_contact ?? ''
  if (!contact.includes('@')) return Promise.resolve()

  return send(
    contact,
    `Item Available for Collection – ${item.name}`,
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2>Item Ready for Collection</h2>
      <p>Hi ${e(item.finder_name) || 'there'},</p>
      <p>The item you turned in — <strong>${e(item.name)}</strong> — has completed its claim period without being collected.</p>
      <p>As the finder, you are now eligible to collect it from the Lost &amp; Found office. Please bring a valid ID.</p>
      <p style="color:#888;font-size:12px">This is an automated notification from the Lost &amp; Found system.</p>
    </div>
    `
  )
}
