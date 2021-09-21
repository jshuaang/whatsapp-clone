function getRecepientEmail(emailUser, allEmail) {
    return (
        allEmail.find((email) => email !== emailUser)
    )
}

export default getRecepientEmail
