import { PureComponent } from "react";
import { animated, config, Transition } from "react-spring";
import { Items, NUM_TRANS } from "./TransitionArray";

class TransitionArrayClass extends PureComponent<{}, { items: Items }> {
    constructor() {
        super({});
        this.state = {
            items: NUM_TRANS,
        };
    }

    componentDidUpdate(_: any, prevState: { items: Items }) {
        const { items: currItems } = this.state;
        const { items: prevItems } = prevState;
        if (currItems.length === 0 && prevItems.length !== currItems.length) {
            setTimeout(() => {
                this.setState({
                    items: NUM_TRANS,
                })
            }, 2000);
        }
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <Transition
                    items={this.state.items}
                    from={{ opacity: 0.5 }}
                    enter={{ opacity: 0.7 }}
                    leave={{ opacity: 0.5 }}
                    delay={200}
                    config={config.molasses}
                    onRest={() => this.setState({ items: [] })}>
                    {({ opacity }, item) => (
                        <animated.div
                            style={{
                                opacity: opacity.to(item.op),
                                transform: opacity
                                    .to(item.trans)
                                    .to((y: number) => `translate3d(0,${y}px,0)`),
                            }}>
                            {item.fig}
                        </animated.div>
                    )}
                </Transition>
            </div >
        )
    }
}

export default TransitionArrayClass;
