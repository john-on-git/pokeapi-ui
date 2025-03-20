import { ReactNode, useState } from "react";
import './Accordion.css';

interface Props {
    title: string;
    content: ReactNode;
    colorOverride?: `#${string}`;
}

/*
    TODO:
        1. should be colored based on move type
        2. table styling
*/

export default function Accordion({title, content, colorOverride: backgroundColor }:Props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={"accordion " + (isOpen ? "accordion-open" : "accordion-closed")}> {/*closed*/}
            <button type="button" style={backgroundColor && {backgroundColor: backgroundColor}}className={"accordion-header"} onClick={() => setIsOpen(!isOpen)}>
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