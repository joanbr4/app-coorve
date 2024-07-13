import { Request } from "express"
import { Resend } from "resend"
import { apiConfig } from "../../config/index"
import { db } from "../../db/client"
import { resetPassword, users } from "../../db/schemas"
import { eq } from "drizzle-orm"
import { resetPassEmail } from "../../email"
import { generatedId } from "../../utils/cuidGenerator"
import { hashPassword } from "../../utils/passwordHash"

async function resetPassController(req: Request) {
  const dataBody = req.body
  const email = req.params.email
  const timeDate = new Date().toISOString()
  const found = await db.select().from(users).where(eq(users.email, email))
  const user = found[0]
  const idGen = generatedId()
  console.log(user)
  if (user) {
    if (dataBody.password === undefined) {
      const resend = new Resend(apiConfig.resend)
      const createResetQuery = await db.insert(resetPassword).values({
        link: idGen,
        email: user.email,
        created_at: timeDate,
        closed_at: "No time",
        userId: user.id,
      })
      console.log(createResetQuery)
      const { data, error } = await resend.emails.send({
        from: "Reset Password  <onboarding@resend.dev>",
        to: [email],
        subject: "Reset Password ",
        html: resetPassEmail(
          user.name,
          user.apellidos,
          user.genere,
          `http://localhost:5173/password/reset/${idGen}`
        ),
      })
      console.log(data, error)
    } else {
      await db
        .update(resetPassword)
        .set({ closed_at: timeDate })
        .where(eq(resetPassword.link, dataBody.link))

      const hashPass = await hashPassword(dataBody.password)

      await db
        .update(users)
        .set({ password: hashPass })
        .where(eq(users.email, email))
    }
  } else {
    console.log(`this email: ${email} doesn't exist`)
  }
}

export { resetPassController }
