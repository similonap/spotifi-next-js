"use client";

import { useState } from "react";
import { buySong } from "@/actions/storeActions";

interface BuyButtonProps {
    songId: number;
    price: number;
}

const BuyButton = ({ songId, price }: BuyButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleBuy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoading) return;

        setIsLoading(true);
        
        try {
            await buySong(songId);
        } catch (error) {
            alert("Failed to buy song: " + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-md z-10 cursor-pointer hover:bg-yellow-400 transition-colors min-w-[70px] text-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleBuy}
        >
            
            {isLoading ? "Buying..." : (isHovered ? "Buy" : `${price} credits`)}
        </div>
    );
};

export default BuyButton;
