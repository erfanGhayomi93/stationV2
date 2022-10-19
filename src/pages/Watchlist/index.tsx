import WatchlistWidget from 'src/widgets/Watchlist/context/WatchlistContext';

function WatchlistPage() {
    return (
        <div className="bg-L-basic dark:bg-D-basic p-2">
            <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium text-2xl p-4">دیده‌بان</h1>

            <WatchlistWidget />
        </div>
    );
}

export default WatchlistPage;
