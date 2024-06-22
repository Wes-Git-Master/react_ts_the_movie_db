import React, {FC, useEffect, useState} from 'react';
import css_common from "../../styles/css_common/button.scroll.to.top.module.css"

interface ScrollToTopButtonProps {
    threshold: number
}

const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({threshold }) => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        showScrollToTop ? <button className={css_common.scrollToTop} onClick={scrollToTop}>↑</button> : null
    );
};

export {ScrollToTopButton};
