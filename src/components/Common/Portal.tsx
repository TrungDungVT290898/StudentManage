import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    selector?: string;
    children: JSX.Element | null
}

const Portal = ({ selector = '#root-portal', children }: PortalProps) => {

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

    }, [selector, selectorPrefixed]);

    return mounted ? createPortal(children, ref.current!) : null;

};

export default Portal;