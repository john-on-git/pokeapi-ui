import { ReactNode, useState } from "react";
import './Accordion.css';

interface Props {
    title: string;
    content: ReactNode;
    overrideColors?: {
        noHover: `#${string}`;
        onHover: `#${string}`;
    };
}

/*
    TODO:
        1. should be colored based on move type
        2. table styling
*/

export default function Accordion({title, content, overrideColors }:Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className={"accordion " + (isOpen ? "accordion-open" : "accordion-closed")}> {/*closed*/}
            <button
                type="button"
                style={overrideColors && (isHovered ? {backgroundColor: overrideColors.onHover} : {backgroundColor: overrideColors.noHover})}
                className={"accordion-header"}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {title}
            </button>

            {
                isOpen && <div className="accordion-body">
                    {content}
                </div>
            }
        </div>
    );
}