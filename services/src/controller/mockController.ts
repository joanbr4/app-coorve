import { Response, Request } from "express"

const mockController = async (req: Request, res: Response) => {
  res.send({ message: "Mock controller called" })
}

export { mockController }
