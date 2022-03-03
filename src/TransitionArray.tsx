import { useEffect, useState } from "react"
import { animated, config, InterpolatorConfig, useTransition } from "react-spring";

export type Items = { fig: number, op: InterpolatorConfig<any>, trans: InterpolatorConfig<any> }[];

export const NUM_TRANS: Items = [
    {
        fig: 1,
        op: { range: [0.75, 1.0], output: [0, 1] },
        trans: { range: [0.0, 1.0], output: [-40, 0], extrapolate: 'clamp' },
    },
    {
        fig: 42,
        // op here is just "opacity control", it's a transformation that is supplied to `to` function from `FrameValue.d.ts`.
        // range is something that tells you at which points during the transition animation, which outputs shall be triggered
        // so you can think about "trans" (used later as "translate3d control") like this:
        /*

            ┌──────┬──────── -40px
            │T=0%  │
            │      │
            │      │
            │      │
            │      │
            ├──────┼──────── +0px
            │T=25% │
            │      │
            │      │
            │      │
            │      │
            │      │
            │      │
            │      │
            │      │
            ├──────┼──────── +40px
            │T=66% │
            │      │
            ├──────┼──────── -40px
            │T=75% │
            │      │
            │      │
            │      │
            │      │
            └──────┘

        */
        // The pixel values are then used to translate over `y` axis via `to` function in animated.div's style.
        //
        // Note that you can chain `to`s to fuse together two or more transitions.
        op: { range: [0.0, 0.1], output: [0, 1] },
        trans: { range: [0.0, 0.25, 0.66, 0.75], output: [-40, 0, 40, -40], extrapolate: 'clamp' },
    },
    {
        fig: 3,
        op: { range: [0.0, 0.25], output: [0, 1] },
        trans: { range: [0.0, 0.25], output: [-40, 0], extrapolate: 'clamp' },
    },
    {
        fig: 4,
        op: { range: [0.5, 0.75], output: [0, 1] },
        trans: { range: [0.0, 0.75], output: [-40, 0], extrapolate: 'clamp' },
    },
];

function TransitionArray() {
    const [items, setItems] = useState(NUM_TRANS);
    const [ticks, setTicks] = useState(0);
    const [perf, setPerf] = useState(performance.now());

    const duration = 900;
    const safetyMsec = 50;
    const delay = 300;

    const transitions = useTransition(items, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        delay,
        config: { ...config.slow, duration },
        onRest: () => {
            console.log("RESTING", ticks)
            setItems([]);
            setTimeout(() => {
                setTicks(ticks + 1);
                setPerf(performance.now());
            }, delay + duration + safetyMsec);
        },
    })

    // This is a self-dependent loop. Every time setItems gets called, a timeout for another setItems gets called,
    // which makes an infinite animation loop.
    useEffect(() => {
        console.log("Rested is now", ticks, performance.now() - perf);
        if (items.length === 0) {
            setTimeout(() => {
                // x -- we have some value
                // xs -- we have an array of some values
                // xkv -- we have a key-value collection of some values
                setItems(
                    NUM_TRANS.map(xkv => ({ ...xkv, fig: xkv.fig - ticks }))
                )
            }, duration + delay + safetyMsec)
        }
    }, [ticks])

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            {transitions(({ opacity }, item) => (
                <animated.div
                    style={{
                        opacity: opacity.to(item.op),
                        transform: opacity
                            .to(item.trans)
                            .to(y => `translate3d(0,${y}px,0)`),
                    }}>
                    {item.fig}
                </animated.div>
            ))}
        </div>
    )
}

export default TransitionArray;
