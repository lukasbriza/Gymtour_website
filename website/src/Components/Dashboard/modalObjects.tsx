import { text } from '../../config/textSource'
const inputErrorHtml = (
    <div className="modalErrorObj">
        <p className="modalErrorHeader">{"409- InputError"}</p>
        <p className="modalErrorContent">{text.crossroad.RegisterPage.Form.modal.invalidInputs.cz}</p>
    </div>
)
const passwordUpdateErrorHtml = (
    <div className="modalErrorObj">
        <p className="modalErrorHeader">{"Aktualizace hesla selhala"}</p>
        <p className="modalErrorContent">{"Něco se nepovedlo, prosím zkontrolujte si zadávané údaje, případně kontaktujte administrátora na emailové adrese info@gymtour.cz"}</p>
    </div>
)
const wrongPassword = (
    <div className="modalErrorObj">
        <p className="modalErrorHeader">{"Původní heslo není správné"}</p>
        <p className="modalErrorContent">{"Vaše staré heslo bylo vyplněno chybně. Prosím zkuste to znovu."}</p>
    </div>
)
const passwordUpdateSucess = (
    [<div className="modalSucessObj" key="1">
        <p className="modalSucessContent" key="2">{"Aktualizace informací proběhla v pořádku, na Váš email jsme Vám zaslali potvrzení o změně údajů."}</p>
    </div>]
)
const nameUpdateErrorHtml = (
    <div className="modalErrorObj">
        <p className="modalErrorHeader">{"Aktualizace jména selhala"}</p>
        <p className="modalErrorContent">{"Něco se nepovedlo, prosím zkontrolujte si zadávané údaje, případně kontaktujte administrátora na emailové adrese info@gymtour.cz"}</p>
    </div>
)
const nameUpdateSucess = (
    [<div className="modalSucessObj" key="1">
        <p className="modalSucessContent" key="2">{"Aktualizace informací proběhla v pořádku, na Váš email jsme Vám zaslali potvrzení o změně údajů."}</p>
    </div>]
)
const emailUpdateErrorHtml = (
    <div className="modalErrorObj">
        <p className="modalErrorHeader">{"Aktualizace jména selhala"}</p>
        <p className="modalErrorContent">{"Něco se nepovedlo, prosím zkontrolujte si zadávané údaje, případně kontaktujte administrátora na emailové adrese info@gymtour.cz"}</p>
    </div>
)
const emailUpdateSucess = (
    [<div className="modalSucessObj" key="1">
        <p className="modalSucessContent" key="2">{"Aktualizace informací proběhla v pořádku, na Váš původní email jsme Vám zaslali zprávu s potvrzovacím odkazem. Po jeho rozkliknutí se změna emailu potvrdí."}</p>
    </div>]
)

export {
    emailUpdateSucess,
    emailUpdateErrorHtml,
    nameUpdateSucess,
    inputErrorHtml,
    passwordUpdateErrorHtml,
    wrongPassword,
    passwordUpdateSucess,
    nameUpdateErrorHtml
}