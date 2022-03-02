import { useEffect, useState } from "react"
import { animated, config, InterpolatorConfig, useTransition } from "react-spring";

const NUM_TRANS: { fig: number, op: any, trans: InterpolatorConfig<any> }[] = [
    {
        fig: 1,
        op: { range: [0.75, 1.0], output: [0, 1] },
        trans: { range: [0.75, 1.0], output: [-40, 0], extrapolate: 'clamp' },
    },
    {
        fig: 2,
        op: { range: [0.25, 0.5], output: [0, 1] },
        trans: { range: [0.25, 0.5], output: [-40, 0], extrapolate: 'clamp' },
    },
    {
        fig: 3,
        op: { range: [0.0, 0.25], output: [0, 1] },
        trans: { range: [0.0, 0.25], output: [-40, 0], extrapolate: 'clamp' },
    },
    {
        fig: 4,
        op: { range: [0.5, 0.75], output: [0, 1] },
        trans: { range: [0.5, 0.75], output: [-40, 0], extrapolate: 'clamp' },
    },
];

function TransitionArray() {
    const [items, setItems] = useState(NUM_TRANS)

    const transitions = useTransition(items, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        delay: 200,
        config: config.molasses,
        onRest: () => setItems([]),
    })

    useEffect(() => {
        if (items.length === 0) {
            setTimeout(() => {
                setItems(NUM_TRANS)
            }, 2000)
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
