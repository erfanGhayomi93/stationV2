import { DependencyList, EffectCallback, RefObject, useEffect } from "react"


const useClickOutside = (
    ref: RefObject<HTMLElement>,
    effect: EffectCallback,
    deps: DependencyList
) => {

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                effect()
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, deps)


}

export default useClickOutside