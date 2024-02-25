import axios from "axios"
import ICity from "../interfaces/cities";


const getCities = async (countryCode: string): Promise<ICity[]> => {
        const cities = (await axios.get(`http://api.geonames.org/searchJSON?name_startsWith=${countryCode}&maxRows=10&username=altys
        `)).data.geonames;
        return cities;
}

export default getCities;


