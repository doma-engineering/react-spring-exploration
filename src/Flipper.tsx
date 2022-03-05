
import { useState } from "react"
import { animated, config, InterpolatorConfig, useTransition } from "@react-spring/web";

export type Items = { content: string, opacity: InterpolatorConfig<any>, transf: InterpolatorConfig<any>, order: number, prevOrder: number }[];

export const Cards: Items = [
  {
    content: 'Error 404',
    opacity: { range: [0, 0.25, 0.75, 1], output: [1, 0.5, 0.5, 1] },
    transf: { range: [0, 1], output: [0, 0]},
    order: 0,
    prevOrder: 0,
  },
  {
    content: 'Devil Home',
    opacity: { range: [0, 0.25, 0.75, 1], output: [1, 0.5, 0.5, 1] },
    transf: { range: [0, 1], output: [0, 1]},
    order: 1,
    prevOrder: 0,
  },
  {
    content: 'Background',
    opacity: { range: [0, 0.25, 0.75, 1], output: [1, 0.5, 0.5, 1] },
    transf: { range: [0, 1], output: [0, 2]},
    order: 2,
    prevOrder: 0,
  },
  {
    content: 'Poters Books',
    opacity: { range: [0, 0.25, 0.75, 1], output: [1, 0.5, 0.5, 1] },
    transf: { range: [0, 1], output: [0, 3]},
    order: 3,
    prevOrder: 0,
  },
  {
    content: 'Ice Cream',
    opacity: { range: [0, 0.25, 0.75, 1], output: [1, 0.5, 0.5, 1] },
    transf: { range: [0, 1], output: [0, 4]},
    order: 4,
    prevOrder: 0,
  },
  {
    content: 'Wild Card',
    opacity: { range: [0, 0.25, 0.75, 1], output: [1, 0.5, 0.5, 1] },
    transf: { range: [0, 1], output: [0, 5]},
    order: 5,
    prevOrder: 0,
  },
];

function TransitionArray() {
    const [items, setItems] = useState(Cards)

    const transitions = useTransition(items, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      config: {...config.default, duration: 1000},
    })

    //save to Items current, next positions, AND update they transformation path.
    const reverseOrder = () => (
      setItems(
        items.map((item) => (
        {...item, 
          prevOrder: item.order, 
          order: items.length-item.order-1,
          transf: {range: [0, 1], output: [item.order, items.length-item.order-1]}
        }
        )))
    );

    //Items have position: 'absolute', height to calculate this.
    const height = 20;

    return (
      <div>
        <button onClick={reverseOrder}>
          Reverse
        </button>
          {transitions(({ opacity }, item) => (
            <div>
              <animated.div
                style={{
                  position: 'absolute',
                  opacity: opacity.to(item.opacity),
                  transform: opacity.to(item.transf).to(y => `translate3d(0,${height*y}px,0)`)
                }}>
                {item.content}
              </animated.div>
            </div>
          ))}
      </div>
    )
}

export default TransitionArray;