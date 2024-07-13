import { Request, Response } from "express"
import Stripe from "stripe"
import { apiConfig } from "../config"
import { db } from "../db/client"
import { users } from "../db/schemas"
import { generatedId } from "../utils/cuidGenerator"
const stripe = new Stripe(apiConfig.stripe_key_test)

const retrieveController = async (req: Request, res: Response) => {
  console.log("wewww")
  const session_id = req.params.id
  try {
    console.log(session_id)
    const { customer_details } = (await stripe.checkout.sessions.retrieve(
      session_id
    )) as object

    console.log("customer_details", customer_details)

    const uuid = generatedId()
    await db.insert(users).values({
      id: uuid,
      name: customer_details.name,
      apellidos: "",
      email: customer_details.email,
      password: "",
      genere: "NS/NC",
      created_at: new Date().toISOString(),
    })
    res.status(200).send({ session: "ok" })
  } catch (error) {
    const err = error as Error
    console.log(err.message)
  }
}

export { retrieveController }
