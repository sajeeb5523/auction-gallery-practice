
const Footer = () => {
    return (
        <div className="flex flex-col items-center text-center py-10 bg-amber-100">
            <div>
                <h2 className="text-3xl"><span className="text-[#003EA4]">Auction<span className="text-[#FFD337] font-bold">Gallery</span></span></h2>
            </div>

            <div className="flex mt-3 p-1"> 
                <h1>Bid.</h1>
                <h1>Win.</h1>
                <h1>Own.</h1>
            </div>

            <div
                className="mt-3 p-1 text-lg flex gap-10">
                <h3>Home</h3>
                <h3>Auctions</h3>
                <h3>Categories</h3>
                <h3>How to works</h3>
            </div>
        </div>
    );
};

export default Footer;