import { animated, useSpring } from 'react-spring';

// What:
// There was one simple square, what can change position based by button pressed.
// Why:
// react spring is big library, but there simplest example how one object can use different spring settings.

// magic x-acis screen percent.
// they isn't screen width... or maybe its only css error what don't give possible go out... no matter
const mxp = window.screen.width / 100.0;

export default function Test1() {
    const [{ y, x }, spring] = useSpring(() => ({
        y: 500,
        x: 0,
    }));

    const handleClickDown = () => {
        spring.start({ y: 500 });
    };
    const handleClickUp = () => {
        spring.start({ y: 20 });
    };
    const handleClickRight = () => {
        spring.start({
            x: 50 * mxp,
        });
    };
    const handleClickLeft = () => {
        spring.start({
            x: -50 * mxp,
        });
    };

    return (
        <div className="flex flex-col w-full justify-center items-center text-slate-200">
            <div className="flex w-4/6 flex-wrap justify-center">
                <button
                    className="btnAccent rounded-full px-4 py-2 w-40  m-3"
                    onClick={handleClickUp}
                >
                    Up
                </button>
                <button
                    className="btnAccent rounded-full px-4 py-2 w-40 m-3"
                    onClick={handleClickDown}
                >
                    Down
                </button>
                <button
                    className="btnAccent rounded-full px-4 py-2 w-40 m-3"
                    onClick={handleClickLeft}
                >
                    Left
                </button>
                <button
                    className="btnAccent rounded-full px-4 py-2 w-40 m-3"
                    onClick={handleClickRight}
                >
                    Right
                </button>
            </div>
            <animated.div
                className="text-center w-20 h-20 bg-gradient-to-br from-orange-500 to-lime-500 rounded relative m-10"
                style={{ marginTop: y, marginLeft: x }}
            ></animated.div>
        </div>
    );
}
