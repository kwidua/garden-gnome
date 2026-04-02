import { ChevronLeft, ChevronRight, Droplets, Scissors, Snowflake, Sun } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { monthOptions } from "../components/ManualPlantForm";
import { useState } from "react";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date()); 

    const thisMonth = (new Date()).getMonth();
    const thisYear = (new Date()).getFullYear();

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

      const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1; // Montag = 0
    };

    const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    return (
        <>
        <Header />
         
        <div className="space-y-4 sm:space-y-6 md:ml-10 md:mr-10 lg:ml-110 lg:mr-110 mt-20 mb-20">
        <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl">
            {monthOptions[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
            </Button>
            </div>
        </div>

        <Card>
            <CardContent className="p-2 sm:p-4">
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {weekDays.map((day) => (
                <div
                    key={day}
                    className="text-center text-xs sm:text-sm font-medium text-muted-foreground py-1 sm:py-2"
                >
                    {day}
                </div>
                ))}

                {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const events = ""
                const isToday = (day === currentDate.getDate()) && (thisMonth === currentDate.getMonth()) && (thisYear === currentDate.getFullYear())

                return (
                    <button
                    key={day}
                    disabled={events.length === 0}
                    className={`aspect-square border border-muted-outline rounded-md p-1 sm:p-2 transition-colors ${
                        isToday
                        ? "bg-primary-green/10 border-primary-green"
                        : events.length > 0
                        ? "hover:bg-secondary cursor-pointer"
                        : "cursor-default"
                    }`}
                    >
                    <div className="flex flex-col h-full">
                        <div className={`text-xs sm:text-sm ${isToday ? "font-bold text-primary" : ""}`}>
                        {day}
                        </div>
                        <div className="flex-1 flex flex-wrap gap-0.5 sm:gap-1 mt-0.5 sm:mt-1 content-start justify-center">
                        {/* {events.map((event, idx) => (
                            <div
                            key={idx}
                            className="hover:scale-110 transition-transform"
                            title={event.title}
                            >
                            {getEventIcon(event.type)}
                            </div>
                        ))} */}
                        </div>
                    </div>
                    </button>
                );
                })}
            </div>
            </CardContent>
            </Card>

            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
                <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <Snowflake className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" />
                    <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Frost</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Unter 5°C</p>
                    </div>
                </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 flex-shrink-0" />
                    <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Ideales Wetter</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Perfekt</p>
                    </div>
                </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <Scissors className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Schnittzeit</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Schneiden</p>
                    </div>
                </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">Gießen</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Empfohlen</p>
                    </div>
                </CardContent>
                </Card>
             </div>
        </div>
        </>
    )
}