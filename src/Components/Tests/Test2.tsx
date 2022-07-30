import { useDrag } from '@use-gesture/react';
import { animated, config, useSpring } from 'react-spring';

//What?
// two draggable square:
//  > blue : 'tied' to screen center by spring,
//  > white: follow cursor.

function FollowingSquare() {
    const [{ x, y }, api] = useSpring(() => ({ x: 40, y: 0 }));
    const bind = useDrag(({ offset: [x, y] }) => api.start({ x, y }));
    return (
        <animated.div
            {...bind()}
            style={{ x, y }}
            className="bg-white h-10 w-10"
        />
    );
}

//TiedSquare constants
const halfSize = 40;
const defaultX = window.innerWidth / 2 - halfSize;
const defaultY = window.innerHeight / 2 - halfSize;

function TiedSquare() {
    const [{ x, y }, api] = useSpring(() => ({ x: defaultX, y: defaultY }));
    const bind = useDrag(({ down, xy: [toX, toY] }) => {
        if (down) {
            api.start({
                x: toX - halfSize,
                y: toY - halfSize,
                immediate: true,
            });
        } else {
            api.start({ x: defaultX, y: defaultY, config: config.wobbly });
        }
    });
    return (
        <animated.div
            className="relative w-20 h-20 bg-gradient-to-r from-sky-700 to-sky-500 rounded-lg shadow-lg shadow-slate-900 
                           hover:border-2 hover:border-green-500 hover:from-violet-600 hover:to-violet-600"
            style={{
                x,
                y,
            }}
            {...bind()}
        ></animated.div>
    );
}

// 'touch-none' is very important part!
// without 'touch-none' on desktop all will work,
// but on mobile phone no one square will not work more than they give possible scroll.
// scroll will activated at ~4 pixel of dragging,
// and by default scroll more important than useDrag(), and useDrag() will canceled!
// 'touch none' make element un-scrollable
// P.S if you wanna know how save scroll and use useDrag() see Test3.tsx.

export default function Test2() {
    return (
        <div className="overscroll-none w-full h-screen touch-none">
            <TiedSquare />
            <FollowingSquare />
        </div>
    );
}
