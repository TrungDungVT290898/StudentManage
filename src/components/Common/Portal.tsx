import { PropsWithChildren, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface IPortal {
    selector?: string;
    children: JSX.Element | null
}

const Portal = (props: PropsWithChildren<IPortal>) => {

    props = {
        selector: 'root-portal',
        ...props
    };

    const { selector, children } = props;
    const ref = useRef<Element>()
    const [mounted, setMounted] = useState(false);

    const selectorPrefixed = '#' + selector?.replace(/^#/, '');

    useEffect(() => {

        ref.current = document.querySelector(selectorPrefixed)!;

        if (!ref.current) {
            const div = document.createElement('div');
            div.setAttribute('id', selector!);
            document.body.appendChild(div);
            ref.current = div;
        }

        setMounted(true);

    }, [selector]);

    return mounted ? createPortal(children, ref.current!) : null;

};

export default Portal;