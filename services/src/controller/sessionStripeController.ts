import Stripe from "stripe"
import { apiConfig } from "../config/index"
import { Request, Response } from "express"

const stripe = new Stripe(apiConfig.stripe_key_test)

const dataCardStripe = [
  {
    name: "Plan Semanal",
    description:
      "Quiero aprovechar al máximo los recursos y los resultados en poco tiempo",
    mode: "payment",
  },
  {
    name: "Plan Mensual",
    description:
      "Quiero desarrollar un plan perfecto, que me permita obtener resultados, no busco la inmediatez sino un plan escalable y seguro.",
    mode: "subscription",
    priceID: "price_1Ksdfsdfsdfsdf",
  },
]
type TSession = {
  payment_method_types: ["card"]
  mode: string
  success_url: string
  line_items: {
    price: string
    price_data: object
    quantity: number
  }
}
type subscriptionPlan = Omit<TSession, "line_items"> & {
  line_items: {
    price: string
    quantity: number
  }[]
  subscription_data: object
}
type paymentPlan = Omit<TSession, "line_items"> & {
  line_items: {
    price_data: {
      currency: string
      product_data: {
        name: string
        description: string
      }
      unit_amount: number
    }
    quantity: number
  }[]
}

async function stripeController(req: Request, res: Response) {
  const { price } = req.body

  const plan = price == 20 ? dataCardStripe[0] : dataCardStripe[1]

  try {
    const pricesObj = await stripe.prices.create({
      currency: "eur",
      unit_amount: price * 100,
      recurring: {
        interval: "month",
      },
      product_data: {
        name: plan.name,
      },
    })

    let sessionParams: paymentPlan | subscriptionPlan
    if (plan.mode === "payment") {
      sessionParams = {
        payment_method_types: ["card"],
        mode: plan.mode,
        success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: plan.name,
                description: plan.description,
              },
              unit_amount: price * 100, // Must be in cents
            },
            quantity: 1,
          },
        ],
      }
    } else {
      sessionParams = {
        payment_method_types: ["card"],
        mode: plan.mode,
        success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        line_items: [
          {
            price: pricesObj.id,
            quantity: 1,
          },
        ],
        subscription_data: {
          metadata: { dta: plan.description },
        },
      }
    }
    const session = await stripe.checkout.sessions.create(
      sessionParams as Stripe.Checkout.SessionCreateParams
    )
    // const retrive = await stripe.checkout.sessions.retrieve(session.id)
    // console.log("23", retrive)
    if (session.customer) {
      const customer = await stripe.customers.retrieve(
        session.customer as string
      )
      console.log("retrieve", customer)
    }
    // const data = await stripe.checkout.sessions.retrieve(session.id)
    console.log("sess url:", session.url)
    res.send({ url: session.url })
  } catch (err) {
    const error = err as Error
    console.log(error.message)
  }
}

export { stripeController }
