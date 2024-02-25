import axios from "axios"
import ICityWeather from "../interfaces/weather";

const updateWeather = async (city: string): Promise<ICityWeather | null> => {
    try {
        const data = (await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da1955093e169563d88c9bf299a58cc0`)).data;
        return data;
    } catch(err) {
        console.log(err)
        return null;
    }
}

export default updateWeather;


