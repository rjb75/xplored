import React, { useState } from "react";
import InputField from "./inputs/InputField";
import DatePicker from "react-datepicker";
import "./NavBar.scss"

const NavBar: React.FC = () => {

    const travelTypes = [{
        name: 'Flights',
        icon: 'flight',
        action: () => {}
    }, {
        name: 'Hotels',
        icon: 'hotels',
        action: () => {}
    }, {
        name: 'Trains',
        icon: 'trains',
        action: () => {}
    }, {
        name: 'Food',
        icon: 'food',
        action: () => {}
    }]

    const trips = [{
        name: 'Seattle Trip',
        id: 'seattle'
    }]

    const [selectedMode, setSelectedMode] = useState<String>('Flights')

    const testFunc = () => {}

    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    return (
        <div className="navbar navbar--container">
            <div className="navbar--primary-row">
                <div className="navbar--left-control">
                    <select>
                        {
                            trips.map((e, i) => {
                                return (
                                    <option key={i} value={e.id}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="navbar--trip-fields">
                    <InputField className="navbar--trip-field" name="Departure Location" placeholder="Calgary, AB" onChangeHandler={testFunc}  />
                    <InputField className="navbar--trip-field" name="Destination" placeholder="Seattle, WA" onChangeHandler={testFunc}  />
                    <DatePicker className="navbar--trip-field" selected={startDate} onChange={(date: Date) => setStartDate(date)} startDate={startDate} endDate={endDate} selectsStart />
                    <DatePicker className="navbar--trip-field" selected={endDate} onChange={(date: Date) => setEndDate(date)} startDate={startDate} endDate={endDate} selectsEnd />
                </div>
                <div className="navbar--right-control">
                    <button className="navbar--profile-link" >View Profile</button>
                </div>
            </div>
            <div className="navbar--type-selector">
                {
                    travelTypes.map((e, i) => {
                        const onClickAction = () => {
                            setSelectedMode(e.name)
                            e.action()
                        }

                        return (
                            <button className={`navbar--type-icon ${selectedMode === e.name ? 'active' : ''}`} key={i} onClick={onClickAction}>
                                {e.name}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default NavBar;