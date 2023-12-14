import React, { useState } from 'react';
import "./css/App.css";

function App() {
    const handleClose = () => {
        window.electron?.ipcRenderer.send('close-app');
    };

    const alertbutton = () => {
        window.electron?.ipcRenderer.send('show-alert');
    };
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const changeMonth = (changeMonthNumber: number) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + changeMonthNumber));
        setCurrentDate(newDate);
    };

    const createCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);

        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(<div key={day} className="calendar-day">{day}</div>);
        }

        return days;
    };

    return (
        <div className="App">
            <section className="title_bar">
                <div className='dragbtn'>드래그</div>
                <div className='closebutton' onClick={alertbutton}>알림버튼</div>
                <div className='closebutton' onClick={handleClose}>종료버튼</div>
            </section>
            <section className="main">
                <a href='http://localhost:8083/apitest'>API기능테스트</a>
                <button onClick={() => changeMonth(-1)}>이전 달</button>
                <button onClick={() => changeMonth(1)}>다음 달</button>
                <div>
                    <h3>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</h3>
                    <div className="calendar">
                        {createCalendar()}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
