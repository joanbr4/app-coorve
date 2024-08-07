function resetPassEmail(
  name: string,
  surname: string,
  genere: string,
  link: string
) {
  const dear = genere == "hombre" ? "Estimado" : "Estimada"
  const nombre = name.toUpperCase()
  const apellidos = surname.toUpperCase()
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer Contraseña</title>
  </head>
  <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
          <div style="text-align: center;">
              <img src="assets/logo-de-coorve-transparante-1024x269.webp" alt="COORVE" style="width: 150px; margin-bottom: 20px;">
          </div>
          <p>${dear} ${nombre} ${apellidos} !</p>
          <p>Ha solicitado restablecer su contraseña para <strong>COORVE</strong>. Para crear una nueva contraseña, haga clic en el enlace a continuación o copie y péguelo en su navegador:</p>
          <p>                  
              <a href="${link}" style="color: #007bff; text-decoration: none;">
                  ${link}
              </a>
          </p>
          <p>
        Sinceramente,</p>
          <p><strong>COORVE</strong> Team</p>
          <p>
              <a href="mailto:info@crowdestor.com" style="color: #007bff; text-decoration: none;">info@coorve.com</a><br>
              <a href="https://www.coorve.com" style="color: #007bff; text-decoration: none;">www.coorve.com</a>
          </p>
          <div style="border-top: 1px solid #ddd; padding-top: 20px; text-align: center; background-color: #1F2937">
              <p style="font-size: 12px; color: #fff;">Copyright © 2024 <strong>COORVE</strong> OÜ, All rights reserved.</p>
              <p style="font-size: 12px; color: #fff;">
                  <a href="mailto:info@coorve.com" style="color: #007bff; text-decoration: none;">info@coorve.com</a><br>
                  +34 93 4444 555
              </p>
          </div>
      </div>
  </body>
  </html>
`
}
export { resetPassEmail }
