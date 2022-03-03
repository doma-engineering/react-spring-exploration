import { useEffect, useState } from "react"
import { animated, config, InterpolatorConfig, useTransition } from "react-spring";

const NUM_TRANS: { fig: number, op: any, trans: InterpolatorConfig<any> }[] = [
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
        op: { range: [0.0, 0.9], output: [0, 1] },
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
    const [items, setItems] = useState(NUM_TRANS)

    const transitions = useTransition(items, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        delay: 100,
        config: config.molasses,
        onRest: () => setItems([]),
    })

    const loopDelayMsec = 300;

    // This is a self-dependent loop. Every time setItems gets called, a timeout for another setItems gets called,
    // which makes an infinite animation loop.
    useEffect(() => {
        if (items.length === 0) {
            setTimeout(() => {
                setItems(NUM_TRANS)
            }, loopDelayMsec)
        }
    }, [items])

    return (
        <div style={{ display: 'flex' }}>
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

// class TransitionArray extends PureComponent {
//     constructor() {
//       super()

//       this.state = {
//         items: NUM_TRANS,
//       }
//     }

//     componentDidUpdate(_, prevState) {
//       const { items: currItems } = this.state
//       const { items: prevItems } = prevState

//       if (currItems.length === 0 && prevItems.length !== currItems.length) {
//         setTimeout(() => {
//           this.setState({
//             items: NUM_TRANS,
//           })
//         }, 2000)
//       }
//     }

//     render() {
//       return (
//         <div style={{ display: 'flex' }}>
//           <Transition
//             items={this.state.items}
//             from={{ opacity: 0 }}
//             enter={{ opacity: 1 }}
//             leave={{ opacity: 0 }}
//             delay={200}
//             config={config.molasses}
//             onRest={() => this.setState({ items: [] })}>
//             {({ opacity }, item) => (
//               <animated.div
//                 style={{
//                   opacity: opacity.to(item.op),
//                   transform: opacity
//                     .to(item.trans)
//                     .to(y => `translate3d(0,${y}px,0)`),
//                 }}>
//                 {item.fig}
//               </animated.div>
//             )}
//           </Transition>
//         </div>
//       )
//     }
//   }

export default TransitionArray;
