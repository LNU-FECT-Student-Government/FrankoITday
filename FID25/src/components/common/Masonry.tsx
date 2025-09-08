import React, { useState, useEffect, useRef, type ReactNode } from "react";

interface MasonryGridProps {
    breakPoints: number[];
    children: ReactNode[];
}

const MasonryGrid: React.FC<MasonryGridProps> = (props) => {
    const [columnCount, setColumnCount] = useState(1);
    const masonRef = useRef<HTMLDivElement>(null);

    const getColumns = (w: number): number => {
        return (
            props.breakPoints.reduceRight((p, c, i) => {
                return c < w ? p : i;
            }, props.breakPoints.length) + 1
        );
    };

    const onResize = () => {
        if (masonRef.current) {
            setColumnCount(getColumns(masonRef.current.offsetWidth));
        }
    };

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const renderColumns = (count: number) => {
        if (count < 1) return null; // Handle case where columnCount is less than 1

        const columns: ReactNode[][] = Array.from({ length: count }, () => []);

        props.children.forEach((child, i) => {
            columns[i % count].push(child);
        });

        return columns.map((column, i) => (
            <div className="flex flex-col mx-1 justify-start grow basis-0 content-stretch" key={i}>
                {column.map((child, j) => (
                    <div key={j}>
                        {child}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="flex flex-row justify-center content-center w-full basis-0 m-auto flex-nowrap" ref={masonRef}>
            {renderColumns(columnCount)}
        </div>
    );
};

export default MasonryGrid;