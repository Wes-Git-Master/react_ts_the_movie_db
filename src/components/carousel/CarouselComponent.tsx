import React, {useEffect, useState} from 'react';
import css from '../../styles/carousel.module.css';

interface CarouselComponentProps<T> {
    array: T[],
    status?: string,
    visibleCount: number,
    renderItem: (type: T) => React.ReactNode
}

const CarouselComponent = <T, >({array, status, visibleCount, renderItem}: CarouselComponentProps<T>) => {

    //===========================================================================================================

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (array.length > 0 && currentIndex >= array.length) {
            setCurrentIndex(0)
        }
    }, [array, currentIndex]);

    const handleNext = () => {
        if (currentIndex < array.length - visibleCount) {
            setCurrentIndex(prevIndex => prevIndex + 1)
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1)
        }
    };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY > 1) {
            handleNext()
        } else {
            handlePrevious()
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    //===========================================================================================================

    return (
        <div className={css.carouselContainer} onWheel={handleWheel}>
            <button onClick={handlePrevious} disabled={currentIndex === 0} className={css.scrollButton}>
                &lt;
            </button>
            <div className={css.carousel}>
                {array.slice(currentIndex, currentIndex + visibleCount).map((item, index) => (
                    <div key={index} className={css.carouselItem}>
                        {renderItem(item)}
                    </div>
                ))}
            </div>
            <button onClick={handleNext} disabled={currentIndex >= array.length - visibleCount}
                    className={css.scrollButton}>
                &gt;
            </button>
        </div>
    );
};

export {CarouselComponent};
