import moment from "moment"

const getCurrentDate = () => {
    const currentDate = moment().format('YYYY-MM-DD')
    return currentDate
}

export default getCurrentDate