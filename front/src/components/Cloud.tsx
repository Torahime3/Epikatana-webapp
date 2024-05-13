import "../styles/Cloud.css";
import cloud1 from '../assets/images/cloud1.png';
import cloud2 from '../assets/images/cloud2.png';
import cloud3 from '../assets/images/cloud3.png';
import { useState } from "react";

interface CloudProps {
    initialX: number;
    initialY: number;
    cloudId: number;
}

const Cloud = ({ initialX, initialY, cloudId } : CloudProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    
    console.log(position)

    const cloud = cloudId === 1 ? cloud1 : cloudId === 2 ? cloud2 : cloud3;

    const onMouseDown = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const onMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (isDragging) {
            const newX = position.x + e.movementX;
            const newY = position.y + e.movementY;
            setPosition({ x: newX, y: newY });
        }
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <img
            src={cloud}
            className="cloud"
            alt="cloud"
            style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px`, cursor: 'grab' }}
            onMouseDown={onMouseDown}
            onMouseMove={isDragging ? onMouseMove : undefined}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}/>

    );

}

export default Cloud;