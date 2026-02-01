const VideoModal = ({ item, close }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative bg-blackMedium border border-yellowPrimary rounded-xl p-4 max-w-4xl w-full mx-6">
        <button
          onClick={close}
          className="absolute top-3 right-4 text-3xl text-textLight hover:text-yellowPrimary"
        >
          ×
        </button>

        <div className="aspect-video bg-black flex items-center justify-center text-textGray">
          Video Placeholder
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
