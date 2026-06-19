const TrailerEmbed = ({ videoKey, title = "Trailer" }) => {
    if (!videoKey) return null;

    return (
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
            <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoKey}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default TrailerEmbed;
