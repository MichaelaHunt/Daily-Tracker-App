import { Button } from "react-native";
import { Calendar } from "../components/calendar";


function ChooseDatePage() {
    return(
        <>
            <Calendar></Calendar>
            <Button title="Submit"></Button>
        </>
    );
}

export default ChooseDatePage;