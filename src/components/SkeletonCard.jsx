const SkeletonCard = () => {
    return (
        <div>
            <div className="mq-sk-poster" />
            <div className="mq-sk-line" style={{ width: "78%", marginTop: 12 }} />
            <div
                className="mq-sk-line"
                style={{ width: "50%", height: 11, marginTop: 8 }}
            />
        </div>
    );
};

export default SkeletonCard;
