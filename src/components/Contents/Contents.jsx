import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contents = () => {

    const [contents, setContents] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetch('bid.json')
            .then(res => res.json())
            .then(data => setContents(data))
    }, [])

    const handleFavorite = (item) => {
        console.log('this is favorite');
        const isAlreadyFavorite = favorites.find(fav => fav.id === item.id)

        if (!isAlreadyFavorite) {
            const newFavorites = [...favorites, item];
            setFavorites(newFavorites);

            const newTotal = newFavorites.reduce((total, fav) => total + parseFloat(fav.currentBidPrice), 0);
            setTotalAmount(newTotal);

            toast.success('Item Added to your Favorite Lists', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleRemoveFavorite = (itemId) => {
        const newFavorites = favorites.filter(fav => fav.id !== itemId);
        setFavorites(newFavorites);

        const newTotal = newFavorites.reduce((sum, fav) => sum + parseFloat(fav.currentBidPrice), 0);
        setTotalAmount(newTotal);

        toast.warning('Item Removed From Favorites!');
    };

    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="space-y-2">
                <h1 className="text-[22px]">Active Auctions</h1>
                <p className="text-sm">Discover and bid on extraordinary items</p>
            </div>

            <div className="flex gap-6 mt-5">
                <div className="w-[70%]">
                    <table className="table card card-border bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="text-lg">
                                <th>Items</th>
                                <th>Current Bid</th>
                                <th>Time Left</th>
                                <th>Bid Now</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contents.map((content) => {
                                const isInFavorites = favorites.some(fav => fav.id === content.id);
                                return (
                                    <tr key={content.id}>
                                        <td>
                                            <div className='flex items-center gap-3'>
                                                <img src={content.image} className='w-16 h-16 rounded' alt="" />
                                                <span className='font-medium'>{content.title}</span>
                                            </div>
                                        </td>

                                        <td className='font-semibold'>${content.currentBidPrice}</td>

                                        <td>{content.timeLeft}</td>

                                        <td>
                                            <button
                                                className={`p-2 rounded ${isInFavorites
                                                    ? ' text-red-500'
                                                    : ' hover:text-red-400 hover:bg-red-50'
                                                    }`}
                                                onClick={() => !isInFavorites && handleFavorite(content)}
                                                disabled={isInFavorites}
                                                title={isInFavorites}
                                            >
                                                {isInFavorites ? <FaHeart size={24} /> : <CiHeart size={24} />}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="w-[30%] bg-white rounded-lg shadow-lg p-6 h-fit">
                    <div className='flex items-center justify-center mb-6 border-b border-gray-200'>
                        <CiHeart size={24} className='text-gray-600 mr-2' />
                        <h2 className='font-medium text-lg text-gray-800'>Favorite Items</h2>
                    </div>

                    <div className='mb-8'>
                        {favorites.length === 0 ? (
                            <div className="text-center py-8">
                                <h3 className='text-xl font-medium text-gray-700 mb-3'>No favorites yet</h3>
                                <p className='text-gray-500 text-sm leading-relaxed'>
                                    Click the heart icon on any item <br />
                                    to add it to your favorites
                                </p>
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                {favorites.map((item) => (
                                    <div key={item.id} className='bg-gray-50 p-3 rounded-lg border border-gray-200'>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className='font-medium text-sm text-left flex-1 text-gray-800'>{item.title}</h3>
                                            <button
                                                onClick={() => handleRemoveFavorite(item.id)}
                                                className='text-red-500 hover:text-red-700 ml-2'
                                            >
                                                <MdClose size={18} />
                                            </button>
                                        </div>

                                        <div className="text-left space-y-1">
                                            <p className="text-xs text-gray-600"><span className="font-medium">Current Bid:</span> ${item.currentBidPrice}</p>
                                            <p className='text-xs text-gray-600'><span className='font-medium'>Bids Count:</span> {item.bidsCount || 0}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='border-t border-gray-200 pt-4'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-base font-medium text-gray-800'>Total bids Amount</h3>
                            <p className='text-xl font-bold text-gray-900'>${totalAmount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Contents;