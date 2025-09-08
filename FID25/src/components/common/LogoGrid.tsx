import { Children } from "react";
import ArrowBlock from "./ArrowBlock";

interface LogoGridProps {
    children: React.ReactNode;
    columns: number;
}

// Main component that renders the grid of logos
const LogoGrid: React.FC<LogoGridProps> = ({ children, columns }) => {
    // We need to convert children to an array to handle single child
    const childrenArray = Children.toArray(children);

    // Calculate the number of rows based on children and column count
    const rows = Math.ceil(childrenArray.length / columns);
    const gridRows = [];

    // Loop to create each row
    for (let i = 0; i < rows; i++) {
        const rowChildren = [];

        // Loop to fill each row with the correct number of children
        for (let j = 0; j < columns; j++) {
            const index = i * columns + j;
            if (index < childrenArray.length) {
                rowChildren.push(childrenArray[index]);
            } else {
                // Add a blank space if the last row isn't full
                rowChildren.push(null);
            }
        }

        // Determine if the row should be shifted left
        const rowClasses = `flex flex-row mb-2 ${i % 2 !== 0 ? '-translate-x-10' : ''}`;

        gridRows.push(
            <div key={i} className={rowClasses}>
                {rowChildren.map((child, index) => (
                    <div key={index} className="flex-1 py-2 shadow-inner">
                        <ArrowBlock className="w-full h-full flex items-center justify-center">
                            {child}
                        </ArrowBlock>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="p-8 -py-4">
            {gridRows}
        </div>
    );
};

export default LogoGrid;
