
import heroImg from '../../../src/assets/Banner-min.jpg';

const Hero = () => {
    return (
        <div>
            <section className="relative h-[350px] md:h-[500px] lg:h-[660px] overflow-hidden">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${heroImg})`,
                        transform: "scaleX(-1)",
                    }}
                />

                <div className="absolute inset-0 bg-black/55"></div>

                <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6 lg:px-0">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-xl md:text-5xl font-bold leading-tight">
                            Bid on Unique Items from Around the World
                        </h1>

                        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                            Discover rare collectibles, luxury goods, and vintage treasures
                            in our curated auctions.
                        </p>

                        <button className="mt-8 btn bg-white text-black border-none rounded-full px-8 hover:bg-gray-200">
                            Explore Auctions
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;