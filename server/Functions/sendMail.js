const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { APIError } = require("../Functions/errorBuilder");

async function sendMail(receiver, type, value, id = undefined) {
  console.log("sendMail");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "brizalukas96@gmail.com",
      pass: "dvnnpwxlklrfmvff",
    },
  });

  let subject =
    type == "email"
      ? "Změna emailové adresy (gymtour.cz)"
      : type == "password"
      ? "Změna hesla (gymtour.cz)"
      : type == "username"
      ? "Změna přihlašovacího jména (gymtour.cz)"
      : null;

  if (subject != null) {
    let info;
    switch (type) {
      case "email":
        if (id !== undefined) {
          const token = jwt.sign({ _id: id }, process.env.JWT_SIGN_KEY);
          try {
            info = await transporter.sendMail({
              from: "brizalukas96@gmail.com",
              to: receiver,
              subject: subject,
              html: `
                    <div>
                    <div style="margin-bottom: 10px"><b>Dobrý den.</b></div>
                    <div>Prosíme o ověření změny emailové adresy <b>${value}</b> kliknutím na tento odkaz: <a href="${
                process.env.EMAIL_VERIFICATION_ADRESS + token
              }"
                    target="_blank"
                    >${process.env.EMAIL_VERIFICATION_ADRESS + token}</a></div>
                    <div style="margin-bottom: 10px">
                      Pokud jste tuto změnu neprováděl/a, ignorujte odkaz a kontaktujte nás na emailové adrese
                      <b>info@gymtour.cz.</b>
                    </div>
                    <div>
                      S přáním příjemného dne,<br />
                      tým <b>Gymtour.cz</b>
                    </div>
                  </div>
                  `,
            });
          } catch (err) {
            if (err instanceof Error) {
              new APIError(
                "Sending update via email failed: " + err.message,
                res,
                response
              );
              return;
            }
            throw err;
          }
        }
        break;
      case "password":
        try {
          info = await transporter.sendMail({
            from: "brizalukas96@gmail.com",
            to: receiver,
            subject: subject,
            html: `
                    <div>
                    <div style="margin-bottom: 10px"><b>Dobrý den.</b></div>
                    <div>Vaše heslo k ůčtu <b>${value}</b> bylo změněno.</div>
                    <div style="margin-bottom: 10px">
                      Pokud jste tuto změnu neprováděl/a, kontaktujte nás na emailové adrese
                      <b>info@gymtour.cz.</b>
                    </div>
                    <div>
                      S přáním příjemného dne,<br />
                      tým <b>Gymtour.cz</b>
                    </div>
                  </div>
                  `,
          });
        } catch (err) {
          if (err instanceof Error) {
            new APIError(
              "Sending update via email failed: " + err.message,
              res,
              response
            );
            return;
          }
          throw err;
        }
        break;
      case "username":
        try {
          info = await transporter.sendMail({
            from: "brizalukas96@gmail.com",
            to: receiver,
            subject: subject,
            html: `
                  <div>
                  <div style="margin-bottom: 10px"><b>Dobrý den.</b></div>
                  <div>Vaše přihlašovací jméno bylo změněno na <b>${value}</b></div>
                  <div style="margin-bottom: 10px">
                    Pokud jste tuto změnu neprováděl/a, kontaktujte nás na emailové adrese
                    <b>info@gymtour.cz.</b>
                  </div>
                  <div>
                    S přáním příjemného dne,<br />
                    tým <b>Gymtour.cz</b>
                  </div>
                </div>
                `,
          });
        } catch (err) {
          if (err instanceof Error) {
            new APIError(
              "Sending update via email failed: " + err.message,
              res,
              response
            );
            return;
          }
          throw err;
        }
        break;
    }
  } else {
    //ERROR HANDLE
    new APIError("Wrong type value.", res, response);
    return;
  }
}

module.exports = { sendMail };
