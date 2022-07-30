import { useDrag } from '@use-gesture/react';
import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import TableSettings from '../CandidateTable/TableSettings';
import {
    MdOutlineArrowBackIos,
    MdOutlineArrowForwardIos,
} from 'react-icons/md';
import TermsAndConditionsPage from '../../Pages/TermsAndConditionsPage';

// What:
// There are page with some content, and LEFT MENU.
// Why:
// Users used to the sliding menu, so need understand how to make them.

const getMenuSize = () =>
    document.querySelector('[role="leftMenu"]')?.clientWidth ?? 0;

const defaultX = 0;

export default function Test3() {
    const [{ x }, api] = useSpring(() => ({
        x: defaultX,
    }));

    const [isDraggingActive, setDraggingActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [menuSize, setMenuSize] = useState(0);
    const [clickCanClose, setClickCanClose] = useState(true);

    useEffect(() => {
        if (menuSize === 0) {
            setMenuSize(getMenuSize());
        }
    }, [menuSize]);

    const open = () => {
        api.start({
            x: menuSize,
            config: { tension: 1000, friction: 100 },
        });
    };

    const close = () => {
        api.start({
            x: defaultX,
            config: { tension: 1000, friction: 100 },
        });
    };

    const bind = useDrag(
        ({
            down,
            initial: [ix],
            movement: [mx],
            lastOffset: [lox],
            velocity: [vx],
            offset: [ox],
            direction: [dx],
        }) => {
            if (down) {
                // if closed move to open
                if (ix < menuSize * 2 && !isOpen) {
                    api.start({
                        x: mx < menuSize ? (mx > 0 ? mx : 0) : menuSize,
                        config: { tension: 1300, friction: 100 },
                    });
                    setDraggingActive(true);
                    setClickCanClose(false);
                }
                // if open move to close
                if (ix < menuSize * 2 && isOpen) {
                    const newx = menuSize + mx;
                    api.start({
                        x: newx < menuSize ? (newx > 0 ? newx : 0) : menuSize,
                        config: { tension: 1300, friction: 100 },
                    });
                    setDraggingActive(true);
                    setClickCanClose(false);
                }
            } else {
                setDraggingActive(false);
                setTimeout(() => {
                    setClickCanClose(true);
                }, 40);
                if (!isOpen) {
                    if (mx >= menuSize || (vx > 2 && dx > 0)) {
                        setIsOpen(true);
                        open();
                    } else {
                        close();
                    }
                }
                if (isOpen) {
                    const newx = menuSize + mx;
                    console.log('-');
                    if (newx < menuSize / 2 || (vx > 2 && dx < 0)) {
                        setIsOpen(false);
                        close();
                    } else {
                        open();
                    }
                }
            }
        },
        {
            // prevent scroll give possible use custom gestures on phones.
            // problem scroll what have high priority than that gesture => gesture canceled
            preventScroll: 250,
        }
    );

    useEffect(() => {
        if (isOpen) open();
        if (!isOpen) close();
    }, [isOpen]);

    const handleClickMenu = () => {
        setIsOpen(!isOpen);
    };

    const calculateStyle = () => `
        z-50 fixed w-5 h-32 bg-sky-500 rounded-r
        text-slate-200 font-bold flex justify-center items-center
        hover:bg-violet-600
        active:bg-sky-800 active:border-sky-500
        ${isDraggingActive ? 'bg-sky-800' : ''}
        `;

    return (
        <div {...bind()} className={' '}>
            <animated.div
                className="fixed z-40 shadow-lg shadow-slate-900 mt-16"
                style={{
                    x,
                }}
                onClick={handleClickMenu}
            >
                <div
                    className="absolute z-40 bg-sky-600 shadow-lg shadow-slate-900"
                    role="leftMenu"
                    style={{ left: -menuSize }}
                >
                    <TableSettings />
                </div>
                <div className={calculateStyle()}>
                    <div>
                        {isOpen ? (
                            <MdOutlineArrowBackIos />
                        ) : (
                            <MdOutlineArrowForwardIos />
                        )}
                    </div>
                </div>
            </animated.div>
            <div
                className="fixed w-full h-screen bg-slate-800/60 z-30"
                onClick={() => {
                    if (clickCanClose) setIsOpen(false);
                }}
            ></div>
            <div>
                <TermsAndConditionsPage />
                <TermsAndConditionsPage />
                <TermsAndConditionsPage />
                <TermsAndConditionsPage />
                <TermsAndConditionsPage />
                <TermsAndConditionsPage />
                <TermsAndConditionsPage />
            </div>
        </div>
    );
}
